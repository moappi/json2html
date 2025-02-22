
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
    
    //=================== Refresh =====================
    
    //Refresh element
    $("body").append("<div id='refresh'></div>");
    it("REFRESH - refresh", function() {
        
        let state = {"text":"chad"};
        
        //Create object to refresh
        document.getElementById("refresh").json2html(state,{"<>":"span","#":"refresh-test","text":"${text}"});
        
        //Change the state
        state.text = "ashley";
        
        //Refresh the object
        json2html.refresh("refresh-test");
        
        //Test
        chai.assert.equal( $("#refresh > span ").html(), "ashley");
    });

    //Refresh component with parameters
    $("body").append("<div id='refresh-component-parameter'></div>");
    it("REFRESH - component with parameters", function() {
        
        let state = {"text":"chad"};

        //Add the component
        json2html.component.add("refresh/component",{"<>":"span","text":"${@text}"});
        
        //Create object to refresh
        document.getElementById("refresh-component-parameter").json2html(state,[
            {"<>":"div","#":"refresh-component-parameter","html":[
                {"[]":"refresh/component","text":"${text}"}
            ]}
        ]);
        
        //Change the state
        state.text = "ashley";
        
        //Refresh the object
        json2html.refresh("refresh-component-parameter");
        
        //Test
        chai.assert.equal( $("#refresh-component-parameter > div > span ").html(), "ashley");
    });
 
     //=================== Assign =====================

    //Input Text
    $("body").append("<div id='input-text-c'></div>");
    it("ASSIGN - text", function() {
        
        let state = {};
        
        document.getElementById("input-text-c").json2html(state,{"<>":"input","id":"input-text","type":"text",">>":"val"});
        
        $("#input-text").val("test");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-text").dispatchEvent(event);
        
        chai.assert.equal( state.val, "test");
    });
    
    //Input Checkbox
    $("body").append("<div id='input-checkbox-c'></div>");
    it("ASSIGN - checkbox", function() {
        
        let state = {};
        
        document.getElementById("input-text-c").json2html(state,{"<>":"input","id":"input-checkbox","type":"checkbox",">>":"val"});
        
        $("#input-checkbox").click();

        chai.assert.equal( state.val, true);
    });

    //Input Color
    $("body").append("<div id='input-color-c'></div>");
    it("ASSIGN - color", function() {
        
        let state = {};
        
        document.getElementById("input-text-c").json2html(state,{"<>":"input","id":"input-color","type":"color",">>":"val"});
        
        $("#input-color").val("#ffffff");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-color").dispatchEvent(event);
        
        chai.assert.equal( state.val, "#ffffff");
    });

    //Input Date
    $("body").append("<div id='input-date-c'></div>");
    it("ASSIGN - date", function() {
        
        let state = {};
        
        document.getElementById("input-date-c").json2html(state,{"<>":"input","id":"input-date","type":"date",">>":"val"});
        
        $("#input-date").val("2020-01-01");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-date").dispatchEvent(event);
        
        chai.assert.equal( state.val, "2020-01-01");
    });

    //Input DateTime
    $("body").append("<div id='input-datetime-c'></div>");
    it("ASSIGN - datetime", function() {
        
        let state = {};
        
        document.getElementById("input-datetime-c").json2html(state,{"<>":"input","id":"input-datetime","type":"datetime",">>":"val"});
        
        $("#input-datetime").val("2020-01-01T00:00");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-datetime").dispatchEvent(event);
        
        chai.assert.equal( state.val, "2020-01-01T00:00");
    });      

    //Input Email
    $("body").append("<div id='input-email-c'></div>");
    it("ASSIGN - email", function() {
        
        let state = {};
        
        document.getElementById("input-email-c").json2html(state,{"<>":"input","id":"input-email","type":"email",">>":"val"});
        
        $("#input-email").val("chad@example.org");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-email").dispatchEvent(event);
        
        chai.assert.equal( state.val, "chad@example.org");
    });     

    //Input Month
    $("body").append("<div id='input-month-c'></div>");
    it("ASSIGN - month", function() {
        
        let state = {};
        
        document.getElementById("input-month-c").json2html(state,{"<>":"input","id":"input-month","type":"month",">>":"val"});
        
        $("#input-month").val("2020-01");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-month").dispatchEvent(event);
        
        chai.assert.equal( state.val, "2020-01");
    });     
    
    //Input Number
    $("body").append("<div id='input-number-c'></div>");
    it("ASSIGN - number", function() {
        
        let state = {};
        
        document.getElementById("input-number-c").json2html(state,{"<>":"input","id":"input-number","type":"number",">>":"val"});
        
        $("#input-number").val("10");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-number").dispatchEvent(event);
        
        chai.assert.equal( state.val, "10");
    });   
    
    //Input Search
    $("body").append("<div id='input-search-c'></div>");
    it("ASSIGN - search", function() {
        
        let state = {};
        
        document.getElementById("input-search-c").json2html(state,{"<>":"input","id":"input-search","type":"search",">>":"val"});
        
        $("#input-search").val("test");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-search").dispatchEvent(event);
        
        chai.assert.equal( state.val, "test");
    });   

    //Input Tel
    $("body").append("<div id='input-tel-c'></div>");
    it("ASSIGN - tel", function() {
        
        let state = {};
        
        document.getElementById("input-tel-c").json2html(state,{"<>":"input","id":"input-tel","type":"tel",">>":"val"});
        
        $("#input-tel").val("123-123-1234");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-tel").dispatchEvent(event);
        
        chai.assert.equal( state.val, "123-123-1234");
    });   
    
    //Input Time
    $("body").append("<div id='input-time-c'></div>");
    it("ASSIGN - time", function() {
        
        let state = {};
        
        document.getElementById("input-time-c").json2html(state,{"<>":"input","id":"input-time","type":"time",">>":"val"});
        
        $("#input-time").val("18:01:07");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-time").dispatchEvent(event);
        
        chai.assert.equal( state.val, "18:01:07");
    });   

    //Input Time
    $("body").append("<div id='input-url-c'></div>");
    it("ASSIGN - url", function() {
        
        let state = {};
        
        document.getElementById("input-url-c").json2html(state,{"<>":"input","id":"input-url","type":"url",">>":"val"});
        
        $("#input-url").val("https://www.example.org");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-url").dispatchEvent(event);
        
        chai.assert.equal( state.val, "https://www.example.org");
    });  
    
    //Input Week
    $("body").append("<div id='input-week-c'></div>");
    it("ASSIGN - week", function() {
        
        let state = {};
        
        document.getElementById("input-week-c").json2html(state,{"<>":"input","id":"input-week","type":"week",">>":"val"});
        
        $("#input-week").val("2020-W46");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-week").dispatchEvent(event);
        
        chai.assert.equal( state.val, "2020-W46");
    }); 
    
    //Input Select
    $("body").append("<div id='input-select-c'></div>");
    it("ASSIGN - select", function() {
        
        let state = {};
        
        document.getElementById("input-select-c").json2html(state,{"<>":"select","id":"input-select",">>":"val","html":[{"<>":"option","value":"Chad","text":"Chad"}]});
        
        $("#input-select").val("Chad");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-select").dispatchEvent(event);
        
        chai.assert.equal( state.val, "Chad");
    }); 

    //Input Textarea
    $("body").append("<div id='input-textarea-c'></div>");
    it("ASSIGN - textarea", function() {
        
        let state = {};
        
        document.getElementById("input-textarea-c").json2html(state,{"<>":"input","id":"input-textarea","type":"textarea",">>":"val"});
        
        $("#input-textarea").val("test");
        
        //Trigger the change
        let event = new Event("change", { bubbles: true });
        document.getElementById("input-textarea").dispatchEvent(event);
        
        chai.assert.equal( state.val, "test");
    });  
  });
});   