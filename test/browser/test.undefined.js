
(function() {

    var template = [
			{"<>":"div", "text":"No Value(${val})"}
		];
    
    var data = {"val":undefined};
        
	document.write('<h1>Undefined Value Test</h1>');

    document.write('<h2>Undefined Not Shown</h2>'+ json2html.render(data,template));
    
	document.write('<hr/>');

})();
