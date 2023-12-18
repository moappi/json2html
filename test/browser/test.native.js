
describe("native", function() {
  describe("#json2html()", function() {
    
    //=================== Specific Options =====================
    
    //Test Method Append
    $("body").append("<div id='native-method-append'><li>monica</li></div>");
    it("OPTIONS - Append", function() {
        document.getElementById("native-method-append").json2html({"name":"dorian"},{"<>":"li","html":"${name}"});
        chai.assert.equal($("#native-method-append").html(), "<li>monica</li><li>dorian</li>");
    });
    
    //Test Method Prepend
    $("body").append("<div id='native-method-prepend'><li>monica</li></div>");
    it("OPTIONS - Prepend", function() {
        document.getElementById("native-method-prepend").json2html({"name":"dorian"},{"<>":"li","html":"${name}"},{"method":"prepend"});
        chai.assert.equal($("#native-method-prepend").html(), "<li>dorian</li><li>monica</li>");
    });
    
    //Test Method Replace
    $("body").append("<div id='native-method-replace'><li id='native-method-replace-item'>monica</li></div>");
    it("OPTIONS - Replace", function() {
        document.getElementById("native-method-replace-item").json2html({"name":"dorian"},{"<>":"li","html":"${name}"},{"method":"replace"});
        chai.assert.equal($("#native-method-replace").html(), "<li>dorian</li>");
    });
    
    //Set Local Components
    $("body").append("<div id='native-set-components'></div>");
    it("OPTIONS - Components", function() {
        document.getElementById("native-set-components").json2html({},{"[]":"test"},{"components":{"test":{"<>":"div"}}});
        chai.assert.equal( $("#native-set-components").html(), "<div></div>");
    });
    
    //Set Data
    $("body").append("<div id='native-set-data'></div>");
    it("OPTIONS - Data", function() {
        document.getElementById("native-set-data").json2html({},{"<>":"div","html":function(obj,index,data){return(data);}},{"data":"test"});
        chai.assert.equal( $("#native-set-data").html(), "<div>test</div>");
    });
    
    //=================== Events =====================
    
    //click
    $("body").append("<div id='native-event-click'></div>");
    it("EVENTS - onclick", function() {
        
        //Create object
        document.getElementById("native-event-click").json2html({"data":"clicked"},{"<>":"div","onclick":function(e){$(this).text(e.obj.data);}});
        
        //Trigger click
        $("#native-event-click > div").click();
        
        //Test
        chai.assert.equal( $("#native-event-click > div ").html(), "clicked");
    });
    
    //json2html onready
    $("body").append("<div id='native-event-ready'></div>");
    it("EVENTS - onready", function() {
        
        //Create object
        document.getElementById("native-event-ready").json2html({},{"<>":"div","onready":function(){$(this).text("ready");}});
        
        //Test
        chai.assert.equal( $("#native-event-ready > div ").html(), "ready");
    });
    
    //Multiple Events (ready and click)
    $("body").append("<div id='native-event-multiple'></div>");
    it("EVENTS - multiple", function() {
        
        //Create object
        document.getElementById("native-event-multiple").json2html({},{"<>":"div","onclick":function(e){$(this).find(">i").text("clicked");},"onready":function(){$(this).find(">span").text("ready");},"html":[{"<>":"span"},{"<>":"i"}]});
        
        //Trigger click
        $("#native-event-multiple > div").click();
        
        var output = $("#native-event-multiple > div > span ").text() + " " + $("#native-event-multiple > div > i ").text();
        
        //Test
        chai.assert.equal( output, "ready clicked");
    });
    
  });
});   