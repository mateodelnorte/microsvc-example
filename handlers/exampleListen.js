var bus = require('microsvc').bus;

bus.listen('example.listen', function (msg) {
  service.log.debug('example.listen received: %j', msg);
  bus.send('example.listen2', {});
});