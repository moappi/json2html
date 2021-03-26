
const json2html = require("node-json2html");

/* ------------------------- Test Long & Shorthand Notation --------------------- */

(function(){

	const movies = [
		{ "name": "The Red Violin", "release": "1998" },
		{ "name": "The blueViolin", "release": "1998" },
		{ "name": "The yellow Violin", "release": "1998" },
		{ "name": "The purple Violin", "release": "1998" },
		{ "name": "The orange Violin", "release": "1998" }
	];

	const templates = {
		"shorthand":[
				{"<>":"b","html":"${name}"},
				{"<>":"span","html":"${release}"}
			],
		
		"longhand":[
				{"<>":"b","html":function(){
					return(this.name);
				}},
				{"<>":"span","html":function(){
					return(this.release);
				}}
		]
	};

	console.log({
		"test-shorthand":json2html.render(movies,templates.shorthand),
		"test-longhand":json2html.render(movies,templates.longhand)
	});
	
})();

/* ------------------------- Test Nesting --------------------- */

(function(){

	const data = {"name":"parent", "children":[ {"name":"child-1"},{"name":"child-2"} ]};

	const templates = {
		"parent":[
			{"<>":"h3","html":"${name}"},
			{"<>":"ul","html":function(){
				return(json2html.render(this.children, templates.child));
			}}
		],

		"child":{"<>":"li","html":[
				{"<>":"strong","html":'${name}'}
			]}
	};
	
	console.log({
		"test-nested":json2html.render(data,templates.parent)
	});
})();

/* ------------------------- Test Components --------------------- */

(function(){
    
    //Create the wrapper component
    // wraps the inner html from sub template with a section element
    json2html.component("wrapper",{"<>":"section","html":function(obj,index,data,html){return(html);}});
    
    //NOT item was already defined in previous test so will overwrite 
    json2html.component("item",{"<>":"li","text":"${value}"});

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
    
    console.log({
        "test-component":json2html.render(data, template)
    });
})();

/* ------------------------- Test Output Option --------------------- */

(function(){
    
    var template = [
        {"<>":"button","onclick":function(e){$(this).text("Clicked")},"text":"Click Me"}
    ];
    
    console.log({
        "text-html":json2html.render({}, template),
        "test-ihtml":json2html.render({}, template,{"output":"ihtml"})
    });
})();

