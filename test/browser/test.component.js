
document.write('<h1>Component Test</h1>');

(function() {
    
    //Create the a new list item component
    json2html.component.add("item",{"<>":"li","text":"${value}"});

    var template = [
        
        {"<>":"ul","html":[
            {"[]":"item","data":function(){
                return(this.items);
            }}
        ]}
    ];
    
    var data = {
        "items":[1,2,3]
    };
    
    var html = json2html.render(data, template);
    
    document.write('<h2>Global Component Test</h2>'+ html);

	document.write('<hr/>');
    
})();

(function() {
    
    //Create the a new list item component
    json2html.component.add("item",{"<>":"li","text":"${value}"});

    var template = [
        
        {"<>":"ul","html":[
            {"[]":"${component}","data":function(){
                return(this.items);
            }}
        ]}
    ];
    
    var data = {
        "component":"item",
        "items":[1,2,3]
    };
    
    var html = json2html.render(data, template);
    
    document.write('<h2>Dynamic ${} Component Name Test</h2>'+ html);

	document.write('<hr/>');
    
})();

(function() {
    
    //Create the a new list item component
    json2html.component.add("item",{"<>":"li","text":"${value}"});

    var template = [
        
        {"<>":"ul","html":[
            {"[]":function(){
                return(this.component);
            },"data":function(){
                return(this.items);
            }}
        ]}
    ];
    
    var data = {
        "component":"item",
        "items":[1,2,3]
    };
    
    var html = json2html.render(data, template);
    
    document.write('<h2>Dynamic Func Component Name Test</h2>'+ html);

	document.write('<hr/>');
    
})();

(function() {
    
    //Create the wrapper component
    // wraps the inner html from sub template with a section element
    json2html.component.add("wrapper",{"<>":"section","html":function(obj,index,data,html){return(html);}});
    
    //NOT item was already defined in previous test so will overwrite 
    json2html.component.add("item",{"<>":"li","text":"${value}"});

    var template = [
        
        //Component used to wrap around sub template
        {"[]":"wrapper","html":[
            {"<>":"ul","html":[
                {"[]":"item","data":function(){
                    return(this.items);
                }}
            ]}
        ]}
    ];
    
    var data = {
        "items":[1,2,3]
    };
    
    var html = json2html.render(data, template);
    
    document.write('<h2>Wrapper Component Test</h2>'+ html);

	document.write('<hr/>');
	
	//Since the wrapper component is already defined globally
    // we'll instead create a local component to be used by this render call
    var components = {
        "wrapper":{"<>":"section","html":[
            {"<>":"h3","text":"Local Wrapper"},
            {"<>":"div","html":function(obj,index,data,html){return(html);}}
        ]}
    };

    //NOTE that we use the wrapper component from the global components (defined in the earlier test)
    var template = [
        
        //Component used to wrap around sub template
        {"[]":"wrapper","html":[
            {"<>":"ul","html":[
                {"[]":"item","data":function(){
                    return(this.items);
                }}
            ]}
        ]}
    ];
    
    var data = {
        "items":[1,2,3]
    };
    
    //Render using the local components first
    // otherwise use the global components
    var html = json2html.render(data, template,{"components":components});
    
    document.write('<h2>Local Wrapper Component Test</h2>'+ html);

	document.write('<hr/>');
    
})();

(function() {
    
    //Add multiple components
    json2html.component.add({
        "p1":{"<>":"p","text":"Paragraph 1"},
        "p2":{"<>":"p","text":"Paragraph 2"}
    });
    
    var template = [
        
        //Component used to wrap around sub template
        {"[]":"p1"},
        {"[]":"p2"}
    ];
    
    var html = json2html.render({}, template);
    
    document.write('<h2>Multiple Component Test</h2>'+ html);

	document.write('<hr/>');
})();


