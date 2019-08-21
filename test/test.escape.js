
(function() {
	//Test the handling of quoted strings 
    var test_data = {"test1":"'single-quoted'", "test2":"\"double-quoted\""};
    var test_data2 = {"test1":"<b>escape HTML test</b>", "test2":"<b>escape HTML test</b>"};

    var transform = [
			{"<>":"input", "html":"", "value":"${test1}"},
			{"<>":"input", "html":"", "value":"${test2}"},
			{"<>":"textarea", "html":"${test1}"},
			{"<>":"textarea", "html":"${test2}"},
		];

        
    var html = json2html.transform(test_data, transform);
    var html2 = json2html.transform(test_data2, transform);

	document.write('<h1>Escape Tests</h1>');

    document.write('<h2>Escape Quotes Test</h2>'+ html);
    document.write('<h2>Escape HTML Test</h2>'+ html2);
    
	document.write('<hr/>');

})();
