
(function() {
    
	var text_data = [
		{"text":"some text","number":1.5,"bool":true}
	];

    var transform = [

		//Test the text shorthand
        {"<>":"ul", "html":[
			{"<>":"li","text":"${text}"},
			{"<>":"li","text":"${number}"},
			{"<>":"li","text":"${bool}"}
		]},

		{"<>":"div","text":"SHOULD BE THE SAME AS BELOW"},

		//Test the text longhand
        {"<>":"ul", "html":[
			{"<>":"li","text":function(){
				return(this.text);
			}},
			{"<>":"li","text":function(){
				return(this.number);
			}},
			{"<>":"li","text":function(){
				return(this.bool);
			}}
		]},
		
    ];
        
    var html = json2html.transform(text_data, transform);

    document.write('<h1>Text Transforms Test</h1>'+ html);

	document.write('<hr/>');
})();
