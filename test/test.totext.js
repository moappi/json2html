const assert = require("assert"),
    fs = require("fs"),
    json2html = require("../node.json2html.js");

//Test the Render Method
describe("json2html", function() {
  describe("#toText()", function() {
    
    it("Special Characters HTML Encoded", function() {
      assert.equal(json2html.toText("&<>\"'\/"), "&amp;&lt;&gt;&quot;&#39;&#x2F;");
    });
  });
});   