
describe("jquery", function() {
  describe("#json2html()", function() {
    
    //=================== jQuery Specific Options =====================
    
    //Test Method Append
    $("body").append("<div id='method-append'><li>monica</li></div>");
    it("OPTIONS - Append", function() {
        chai.assert.equal($("#method-append").json2html({"name":"dorian"},{"<>":"li","html":"${name}"}).html(), "<li>monica</li><li>dorian</li>");
    });
    
    //Test Method Append
    $("body").append("<div id='method-prepend'><li>monica</li></div>");
    it("OPTIONS - Prepend", function() {
        chai.assert.equal($("#method-prepend").json2html({"name":"dorian"},{"<>":"li","html":"${name}"},{"method":"prepend"}).html(), "<li>dorian</li><li>monica</li>");
    });
    
    //Test Method Replace
    $("body").append("<div id='method-replace'><li>monica</li></div>");
    it("OPTIONS - Replace", function() {
        $("#method-replace li").json2html({"name":"dorian"},{"<>":"li","html":"${name}"},{"method":"replace"});
        chai.assert.equal($("#method-replace").html(), "<li>dorian</li>");
    });
    
    //Set Local Components
    $("body").append("<div id='set-components'></div>");
    it("OPTIONS - Components", function() {
        $("#set-components").json2html({},{"[]":"test"},{"components":{"test":{"<>":"div"}}});
        chai.assert.equal( $("#set-components").html(), "<div></div>");
    });
    
    //Set Data
    $("body").append("<div id='set-data'></div>");
    it("OPTIONS - Data", function() {
        $("#set-data").json2html({},{"<>":"div","html":function(obj,index,data){return(data);}},{"data":"test"});
        chai.assert.equal( $("#set-data").html(), "<div>test</div>");
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
    
    //=================== $.json2html METHOD =====================
    
    //$.json2html with events
    $("body").append("<div id='json2html-render-ithml'></div>");
    it("$.json2html - Render (iHTML)", function() {
        
        //Render using $.json2html with events
        $("#json2html-render-ithml").json2html({},[
            {"<>":"div","html":function(){
                return($.json2html({},{"<>":"span","onclick":function(){$(this).html("clicked");}}));
            }}
        ]);
        
        //Trigger the event
        $("#json2html-render-ithml > div > span").click();
        
        //Test
        chai.assert.equal( $("#json2html-render-ithml > div > span").html(), "clicked");
    });
    
    //Return with HTML
    $("body").append("<div id='json2html-render-html'></div>");
    it("json2html.render - Render (HTML)", function() {
        
        //Render using json2html.render
        $("#json2html-render-html").json2html({},[
            {"<>":"div","html":function(){
                return(json2html.render({},{"<>":"span","html":"working"}));
            }}
        ]);
        
        //Test
        chai.assert.equal( $("#json2html-render-html > div > span").html(), "working");
    });
    
    
  });
});  