    
	//Test nested dynamic children 
	// calls json2html recusively
    var nested = {"name":"parent", "children": [{"name": "child1"}, {"name": "child2"}]};

	var transforms = {
		"parent":[
			{"<>":"span", "html":"${name}"},
			{"<>":"ul","html":function(){return(json2html.transform(this.children, transforms.child));}}
		],

		"child":{"<>":"li", children:[
				{"<>": "b", "html":"${name}"}
			]}
	};

    var html = json2html.transform(nested,transforms.parent);

    document.write('<h1>Nested Test</h1>'+ html);
