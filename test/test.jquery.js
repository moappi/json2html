
$(function() {
    
	//Specs on what tests to run and how to display the results
    var run = {
        //How to display and run the tests
        "display":[
            {"<>":"h3","text":"${title}"},
            {"<>":"div","html":function(obj,index,_data){
                //Process each test (with jquery plugin)
				// make sure to chain the data object (for events)
                return($.json2html(data[this.data],transforms[this.transform],{"data":_data}));  
            }}
        ],

		"tests":[
			{"title":"Single Object - Single Transform","data":"single","transform":"single"},
			{"title":"Single Object - Multi Transform","data":"single","transform":"multi"},
			{"title":"Single Object - Children Transform","data":"single","transform":"children"},
			{"title":"Single Object - Function Transform","data":"single","transform":"func"},
			{"title":"Single Object - Event Transform","data":"single","transform":"event"},
			{"title":"Single Object - Data Transform","data":"single","transform":"data"},
			{"title":"Single Object - Embed Transform","data":"single","transform":"json2html.html"},

			{"title":"Array - Single Transform","data":"array","transform":"single"},
			{"title":"Array - Multi Transform","data":"array","transform":"multi"},
			{"title":"Array - Children Transform","data":"array","transform":"children"},
			{"title":"Array - Function Transform","data":"array","transform":"func"},
			{"title":"Array - Event Transform","data":"array","transform":"event"},
			{"title":"Array - Data Transform","data":"array","transform":"data"},
			{"title":"Array - Embed Transform","data":"array","transform":"json2html.html"},
		]
    };

    //Transforms to test
    var transforms = {
    
        "single":{"<>":"div","html":"${html}"},
        
        "multi":[
            {"<>":"span","html":"${html}"},
            {"<>":"span","html":" ${attr}"}
        ],
    
        "children":{"<>":"div","test":"${attr}","html":[
            {"<>":"span","text":"${html}"}
        ]},
        
        "func":{"<>":"div","data-attr":function(){return(this.attr)},"html":[
            {"<>":"span","text":function(){return(this.html)}}
        ]},
        
        "event":{"<>":"button","class":"btn btn-primary","html":"Click","onclick":function(e){
			$(this).attr("disabled","true").html("DONE - " + e.data);
        }},

		"data":{"<>":"span","text":function(obj,index,_data){
			return(_data);
		}},

		"json2html.html":{"<>":"div","html":function(obj,index,_data){
			return($.json2html(data.single,transforms.single,{"output":"html","data":_data}));
		}}
    };
    
    //Datasets for tests
    var data = {
        "single":{"attr":"attr-1","html":"html-1"},
        
        "array":[
            {"attr":"attr-1","html":"html-1"},
            {"attr":"attr-2","html":"html-2"}
        ]
    };

	$('body').append("<h1>jQuery Tests</h1>");

    //Ok run the tests!
    $('body').json2html(run.tests,run.display,{"data":"DATA"});

	//Run last test
	// insure that jquery object has registered events correctly
	$('body').append( $.json2html({"title":"$.json2html - Output jQuery","data":"single","transform":"event"},run.display,{"output":"jquery","data":"DATA"}));

	$('body').append("<hr/>");
});
