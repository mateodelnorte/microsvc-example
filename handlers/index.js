var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname);

files.forEach(function (file) {
  if (file === 'index.js') return;
  var filename = path.join(__dirname, file);
  require(filename);
});