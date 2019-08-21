
(function() {
    
    var transform = [

		//Get the event data (text)
        {"<>":"div", "text":function(obj,index,_data){
			if(!_data) return("!MISSING EVENT DATA!");
            else return(_data);
        }},

		//Get the event data (html)
        {"<>":"div", "html":function(obj,index,_data){
			if(!_data) return("!MISSING EVENT DATA!");
            else return(_data);
        }}
    ];
        
    var html = json2html.transform({}, transform,{"data":"EVENT DATA"});

    document.write('<h1>Data Options Test</h1>'+ html);

	document.write('<hr/>');
})();
