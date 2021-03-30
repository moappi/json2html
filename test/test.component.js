const assert = require("assert"),
    fs = require("fs"),
    json2html = require("../node.json2html.js");

//Test the Render Method
describe("json2html", function() {
    describe("component", function() {
        describe("#add(name,template)/#get()", function() {
            
            //Add the component
            json2html.component.add("a",{"<>":"div"});
            
            //Check if we can get the component
            it("Add then Get a Component", function() {
              assert.equal( JSON.stringify(json2html.component.get("a")), JSON.stringify({"<>":"div"}) );
            });
        });
        
        describe("#add(components)/#get()", function() {
            
            //Add the component
            json2html.component.add({
                    "b":{"<>":"i"},
                    "c":{"<>":"span"}
                });
            
            //Check if we can get the component
            it("Add Muliple Components then Get", function() {
                assert.equal( JSON.stringify(json2html.component.get("a")), JSON.stringify({"<>":"div"}) );
                assert.equal( JSON.stringify(json2html.component.get("b")), JSON.stringify({"<>":"i"}) );
                assert.equal( JSON.stringify(json2html.component.get("c")), JSON.stringify({"<>":"span"}) );
            });
        });
    });
});   