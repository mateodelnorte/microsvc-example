var bus = require('microsvc').bus;

bus.subscribe('example.subscribe', function (msg) {
  service.log.debug('example.subscribe received: %j', msg);
});