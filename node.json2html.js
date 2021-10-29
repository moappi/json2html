const fs = require("fs"),
	vm = require("vm"),
	path = require("path");

const load = function(js) {
    const filePath = path.join(__dirname, js);
    vm.runInThisContext(fs.readFileSync(filePath), js);
}.bind(this);

//Load the es6 support (for use of template literals)
//BETA ONLY
//load("json2html.es6.js");

//Load json2html main library
load("json2html.js");

//Use with require
module.exports = json2html;
