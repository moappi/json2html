const fs = require("fs"),
	vm = require("vm"),
	path = require("path");

const load = function(js) {
    const filePath = path.join(__dirname, js);
    vm.runInThisContext(fs.readFileSync(filePath), js);
}.bind(this);

//Load json2html main library
load("json2html.js");

//Use with require
module.exports = json2html;
