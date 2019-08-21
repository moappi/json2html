
$(function() {
    
	//Data to be used by void elements for attributes
	var data = {

		"area":"https://via.placeholder.com/15/0000FF/FFFFFF/",

		"base":"/",

		"col":2,

		"command":"Save",

		"embed":"",

		"img":"https://via.placeholder.com/150",
		
		"input":"Placeholder...",

		"link":"https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css",

		"meta":"JSON2HTML Tests",

		"source":"",

		"track":""
	};

	//Void element transforms
    var transforms = [

		//area (INCOMPLETE)
		{"<>":"area","shape":"rect","coords":"19,28,222,228","href":"${area}","target":"_blank","html":"!IGNORED!"},
		
		//base
		{"<>":"base","target":"_blank","href":"${base}","html":"!IGNORED!"},

		//br
		{"<>":"br","html":"!IGNORED!"},
		
		//col (INCOMPLETE)
		{"<>":"col","span":function(){return(this.col);},"html":"!IGNORED!"},
		
		//command 
		{"<>":"command","type":"command","label":"${command}","onclick":"save()","html":"!IGNORED!"},
		
		//embed
		{"<>":"embed","src":"${embed}","html":"!IGNORED!"},
		
		//hr
		{"<>":"hr","html":"!IGNORED!"},

		//img
		{"<>":"img","src":"${img}","html":"!IGNORED!"},

		//input
		{"<>":"input","type":"text","placeholder":"${input}","html":"!IGNORED!"},

		//keygen
		{"<>":"keygen","name":"name","challenge":"${keygen}","keytype":"type","keyparams":"pqg-params","html":"!IGNORED!"},
		
		//link
		{"<>":"link","href":"${link}","rel":"stylesheet","html":"!IGNORED!"},

		//meta
		{"<>":"meta","name":"description","content":"${meta}","html":"!IGNORED!"},

		//param
		{"<>":"param","name":"${param}","value":"true","html":"!IGNORED!"},

		//source
		{"<>":"source","src":"${source}","type":"audio/x-ms-wma","html":"!IGNORED!"},

		//track
		{"<>":"track","src":"${track}","kind":"subtitles","srclang":"it","label":"Italian","html":"!IGNORED!"},
		
		//wbr
		{"<>":"wbr","html":"!IGNORED!"}
	];

	$('body').append("<h1>Void Elements Test</h1><p>Requires inspection of HTML</p>");

	//Add the void elements
	$("body").json2html(data,transforms);
	
	$("body").append("<hr/>");
});
