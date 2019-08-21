
(function() {

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
		"shorthand":{"<>": "li", "html": [
				{"<>":"b", "text":"${name}"},
				{"<>":"span", "text":"${year}"},
			]},

		"longhand":{"<>": "li", "html": [
				{"<>": "b", "text": function(){return(this.name);}},
				{"<>": "span", "text": function(){return(this.year);}}
			]}
	};
        
	document.write('<h1>Shorthand & Longhand Tests</h1>');
	
	document.write('<h2>Shorthand</h2>'+ json2html.transform(movies,transforms.shorthand));
    document.write('<h2>Longhand</h2>'+ json2html.transform(movies,transforms.longhand));

	document.write('<hr/>');
})();