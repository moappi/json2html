var fs = require('fs'),
	vm = require('vm'),
	path = require('path');

var load = function(js) {
    var filePath = path.join(__dirname, js);
    vm.runInThisContext(fs.readFileSync(filePath), js);
}.bind(this);

load('json2html.js');

module.exports = json2html;
