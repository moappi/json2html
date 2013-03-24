
	//Test the short hand notation 
	// as well as the direct reference via this
    var movies = [
    	{ "Name": "The Red Violin", "ReleaseYear": "1998" },
		{ "Name": "The blue Violin", "ReleaseYear": "1998" },
		{ "Name": "The yellow Violin", "ReleaseYear": "1998" },
		{ "Name": "The purple Violin", "ReleaseYear": "1998" },
		{ "Name": "The orange Violin", "ReleaseYear": "1998" }
	];

    var transform_shortHand = 
			{"tag": "li", "children": [
				{"tag":"b", "html":"${Name}"},
				{"tag":"span", "html":"${ReleaseYear}"}			
			]};

	var transform_longHand = 
			{"tag": "li", children: [
				{"tag": "b", "html": function(){return(this.Name);}},
				{"tag": "span", "html": function(){return(this.ReleaseYear);}}
			]};
        
    var html1 = json2html.transform(movies,transform_shortHand);
    
    var html2 = json2html.transform(movies,transform_longHand);
    
	document.write('<h1>Shorthand Test</h1>'+ html1 + '<br><br>' + html2);
