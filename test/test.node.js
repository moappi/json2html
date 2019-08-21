    
	var json2html = require('node-json2html');

	/* ------------------------- Test Long & Shorthand Notation --------------------- */
	
	(function(){

		var movies = [
			{ "name": "The Red Violin", "release": "1998" },
			{ "name": "The blueViolin", "release": "1998" },
			{ "name": "The yellow Violin", "release": "1998" },
			{ "name": "The purple Violin", "release": "1998" },
			{ "name": "The orange Violin", "release": "1998" }
		];

		var transforms = {
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
			"shorthand":json2html.transform(movies,transforms.shorthand),
			"longhand":json2html.transform(movies,transforms.longhand)
		});
		
	})();

	/* ------------------------- Test Nesting --------------------- */

	(function(){

		var data = {"name":"parent", "children":[ {"name":"child-1"},{"name":"child-2"} ]};

		var transforms = {
			"parent":[
				{"<>":"h3","html":"${name}"},
				{"<>":"ul","html":function(){
					return(json2html.transform(this.children, transforms.child));
				}}
			],

			"child":{"<>":"li","html":[
					{"<>":"strong","html":'${name}'}
				]}
		};
		
		console.log({
			"nested":json2html.transform(data,transforms.parent)
		});
	})();