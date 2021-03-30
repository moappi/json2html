const assert = require("assert"),
    fs = require("fs"),
    json2html = require("../node.json2html.js");

//Read the tests
let tests = require("./test.render.data.js");

//Test the Render Method
describe("json2html", function() {
  describe("#render()", function() {
    
    //Run through all the tests for render
    for(let test of tests) {
        
        if(test.components) json2html.component.add(test.components);
        
        //Perform the test
        it(test.name, function() {
          assert.equal(json2html.render(test.data,test.template,test.options), test.html);
        });
    }
  });
});  