
(function() {
    
	//Test the handling of quoted strings 
    var test_data = [
		{"text":"<script>alert(0);</script> no alert"},
		{"text":"<strong>non highlighted</strong>"},
		{"text":"& (ampersand) : ' (single quote) : \" (double quote) "}
	];

    var transform = [
        {"<>":"div", "text":"${text}"},
        {"<>":"div","text":[
            {"<>":"span","text":"this shouldn't be rendered"}
        ]},
        {"<>":"div", "text":function(){
            return(this.text);
        }},
        {"<>":"div", "text":function(){
            return(["not rendered"]);
        }}
    ];
        
    var html = json2html.transform(test_data, transform);

    document.write('<h1>Text Encoding Test</h1>'+ html);
})();
