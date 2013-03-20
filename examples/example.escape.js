
(function() {
	//Test the handling of quoted strings 
    var test_data = {"test1":"'single-quoted'", "test2":"\"double-quoted\""};

    var transform = [
			{"tag":"input", "html":"", "value":"${test1}"},
			{"tag":"input", "html":"", "value":"${test2}"},
			{"tag":"textarea", "html":"${test1}"},
			{"tag":"textarea", "html":"${test2}"},
		];

        
    var html = json2html.transform(test_data, transform);

    document.write('<h1>Escape Quotes Test</h1>'+ html);
})();
