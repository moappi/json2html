//     jquery.json2html.js 1.3.0
//     https://www.json2html.com
//     (c) 2006-2019 Crystalline Technologies
//     Json2html may be freely distributed under the MIT license.

(function($){	

	/* ---------------------------------------- Public Methods ------------------------------------------------ */

    //Alias for json2html.transform
	// _options 
	//   output : json2html | html | jquery
    $.json2html = function(json, transform, _options) {
        
        //Make sure we have the json2html base loaded
        if(typeof json2html === 'undefined') return(undefined);

		//Default Options
        var options = {
            'output':'json2html'
        };

		//Extend the options (with defaults)
        if( _options !== undefined ) $.extend(options, _options);

		//Add the data object
		// LEGACY support for eventData, now just data
		if(options.eventData) {

			//Set the data object to the eventData
			options.data = options.eventData;
			
			//Remove the "eventData" object 
			// we only use "data" 
			delete options.eventData;
		}

		switch(options.output){

			//Process the transform with events
			// for consumption within a json2html html attribute function call 
			// returns an object {'html':html,'events'[]}
			case 'json2html':

				//make sure we have the events set as true
				options.events = true;

				return(json2html.transform(json, transform, options));
			break;

			//Return raw html (same as calling json2html.transform
			case 'html':

				//make sure we have the events set as false (to get html)
				options.events = false;
				
				return(json2html.transform(json, transform, options));
			break;
		
			//Return a jquery object
			case 'jquery':

				//make sure we have the events set as true
				options.events = false;

				//let json2html core do it's magic
				// and then process any jquery events
				var $result = _events(json2html.transform(json, transform, options));

				//return the jquery object
				return($result);
			break;
		}
    };

	//Chaining method
	$.fn.json2html = function(json, transform, _options) {

        //Make sure we have the json2html base loaded
        if(typeof json2html === 'undefined') return(undefined);

        //Default Options
        var options = {
            'append':true,
            'replace':false,
            'prepend':false
        };

        //Extend the options (with defaults)
        if( _options !== undefined ) $.extend(options, _options);

		//Add the data object
		// LEGACY support for eventData, now just data
		if(options.eventData) {

			//Set the data object to the eventData
			options.data = options.eventData;
			
			//Remove the "eventData" object 
			// we only use "data" 
			delete options.eventData;
		}
        
        //Insure that we have the events turned (Required)
        options.events = true;

        //Otherwise we're running $.json2html
        return this.each(function(){ 
            
            //let json2html core do it's magic
            // and then process any jquery events
            var $result = _events(json2html.transform(json, transform, options));

            //Append it to the appropriate element
            if (options.replace) $.fn.replaceWith.call($(this),$result);
            else if (options.prepend) $.fn.prepend.call($(this),$result);
            else $.fn.append.call($(this),$result);
        });
    };

	/* ---------------------------------------- Prviate Methods ------------------------------------------------ */

	function _events(result) {

		//Make sure we have events
		if(!result.events) return;

		//Attach the html(string) result to the DOM
		var dom = $(document.createElement('i')).html(result.html);

		//Determine if we have events
		for(var i = 0; i < result.events.length; i++) {
			
			var event = result.events[i];
			
			//find the associated DOM object with this event
			var obj = $(dom).find("[json2html-event-id-"+event.type+"='" + event.id + "']");
			
			//Check to see if we found this element or not
			if(obj.length === 0) throw 'jquery.json2html was unable to attach event ' + event.id + ' to DOM';
			
			//remove the attribute
			$(obj).removeAttr('json2html-event-id-'+event.type);
			
			//attach the event
			$(obj).on(event.type,event.data,function(e){
				//attach the jquery event
				e.data.event = e;
				
				//call the appropriate method
				e.data.action.call($(this),e.data);
			});
		}
		
		//Get the children to this result
		return($(dom).children());
	}
})(jQuery);


