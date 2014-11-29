var bunyan = require('bunyan');
var service = require('microsvc').global();
var cconfig = require('microsvc-cconfig');
var servicebus = require('microsvc-bus');
var util = require('util');

service.param('name', 'microsvc-example');

var logger = bunyan.createLogger({ name: service.param('name') });
var busLogger = bunyan.createLogger({ name: 'servicebus' });

var self = this;

logger.level(0);
busLogger.level(0);

service
  .logger(logger)
  .plugin(cconfig())
  .plugin(function (service) {
    return servicebus({
        log: function (msg) { busLogger.debug(msg); },
        url: service.config.RABBITMQ_URL
      }, function (bus) {
      bus.use(bus.package());
      bus.use(bus.correlate());
      bus.use(bus.logger({
        fnIncoming: function (channel, message, options, next) {
          busLogger.debug({ message: message }, util.format('received %j via routingKey %s', message.content, message.fields.routingKey));
        },
        fnOutgoing: function (message, queueName) {
          busLogger.debug({ message: message }, util.format('sending %j to %s', message, queueName));
        }
      }));
      bus.use(bus.retry());
    });
  });

service.on('started', function () {

  require('./handlers');

  service.log.info('%s started', service.param('name'));

  service.log.debug({ config: service.config }, 'loaded config');

});

service.start();