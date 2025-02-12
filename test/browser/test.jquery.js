
describe("jquery", function() {
  describe("#json2html()", function() {
    
    //=================== jQuery Specific Options =====================
    
    //Test Method Append
    $("body").append("<div id='method-append'><li>ashley</li></div>");
    it("OPTIONS - Append", function() {
        chai.assert.equal($("#method-append").json2html({"name":"chad"},{"<>":"li","html":"${name}"}).html(), "<li>ashley</li><li>chad</li>");
    });
    
    //Test Method Prepend
    $("body").append("<div id='method-prepend'><li>ashley</li></div>");
    it("OPTIONS - Prepend", function() {
        chai.assert.equal($("#method-prepend").json2html({"name":"chad"},{"<>":"li","html":"${name}"},{"method":"prepend"}).html(), "<li>chad</li><li>ashley</li>");
    });
    
    //Test Method Replace
    $("body").append("<div id='method-replace'><li>ashley</li></div>");
    it("OPTIONS - Replace", function() {
        $("#method-replace li").json2html({"name":"chad"},{"<>":"li","html":"${name}"},{"method":"replace"});
        chai.assert.equal($("#method-replace").html(), "<li>chad</li>");
    });
    
    //Set Local Components
    $("body").append("<div id='set-components'></div>");
    it("OPTIONS - Components", function() {
        $("#set-components").json2html({},{"[]":"test"},{"components":{"test":{"<>":"div"}}});
        chai.assert.equal( $("#set-components").html(), "<div></div>");
    });
    
    //=================== jQuery Events =====================
    
    //jQuery Click
    $("body").append("<div id='jquery-event-click'></div>");
    it("EVENTS - onclick", function() {
        
        //Create object
        $("#jquery-event-click").json2html({"data":"clicked"},{"<>":"div","onclick":function(e){$(this).text(e.obj.data);}});
        
        //Trigger click
        $("#jquery-event-click > div").click();
        
        //Test
        chai.assert.equal( $("#jquery-event-click > div ").html(), "clicked");
    });
    
    //json2html onready
    $("body").append("<div id='jquery-event-ready'></div>");
    it("EVENTS - onready", function() {
        
        //Create object
        $("#jquery-event-ready").json2html({},{"<>":"div","onready":function(){$(this).text("ready");}});
        
        //Test
        chai.assert.equal( $("#jquery-event-ready > div ").html(), "ready");
    });
    
    //Multiple Events (ready and click)
    $("body").append("<div id='jquery-event-multiple'></div>");
    it("EVENTS - multiple", function() {
        
        //Create object
        $("#jquery-event-multiple").json2html({},{"<>":"div","onclick":function(e){$(this).find(">i").text("clicked");},"onready":function(){$(this).find(">span").text("ready");},"html":[{"<>":"span"},{"<>":"i"}]});
        
        //Trigger click
        $("#jquery-event-multiple > div").click();
        
        var output = $("#jquery-event-multiple > div > span ").text() + " " + $("#jquery-event-multiple > div > i ").text();
        
        //Test
        chai.assert.equal( output, "ready clicked");
    });
    
  });
});  