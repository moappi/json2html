
	//Test the short hand notation 
	// as well as the direct reference via this
    var movies = [
    	{ "name": "The Red Violin", "year": "1998" },
		{ "name": "The blue Violin", "year": "1999" },
		{ "name": "The yellow Violin", "year": "2000" },
		{ "name": "The purple Violin", "year": "2010" },
		{ "name": "The orange Violin", "year": "2015" }
	];

	var transforms = {
		"shorthand":{"<>": "li", "children": [
				{"<>":"b", "html":"${name}"},
				{"<>":"span", "html":"${year}"}			
			]},

		"longhand":{"<>": "li", children: [
				{"<>": "b", "html": function(){return(this.name);}},
				{"<>": "span", "html": function(){return(this.year);}}
			]}
	};
        
    var html1 = json2html.transform(movies,transforms.shorthand);
    
    var html2 = json2html.transform(movies,transforms.longhand);
    
	document.write('<h1>Shorthand Test</h1>'+ html1 + '<br><br>' + html2);
