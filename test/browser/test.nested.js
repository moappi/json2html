
(function() {

	//Test nested dynamic children 
	// calls json2html recusively
    var data = {"name":"parent", "list": [{"name": "child1"}, {"name": "child2"}]};

	var templates = {
		"list":[
			{"<>":"h2", "html":"${name}"},
			{"<>":"ul","html":function(){
				return(json2html.render(this.list, templates.item));
			}}
		],

		"item":{"<>":"li", "html":[
				{"<>": "b", "text":"${name}"}
			]}
	};

    var html = json2html.render(data,templates.list);

    document.write('<h1>Nested Test</h1>'+ html);
	
	document.write('<hr/>');
})();