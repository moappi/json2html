//Copyright (c) 2013 Crystalline Technologies
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'),
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
//  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var json2html = {
	
	/* ---------------------------------------- Public Methods ------------------------------------------------ */
	'transform': function(json,transform,_options) {
		
		//create the default output
		var out = {'events':[],'html':''};
		
		//default options (by default we don't allow events)
		var options = {
			'events':false
		};
		
		//extend the options
		options = json2html._extend(options,_options);

		//Make sure we have a transform & json object
		if( transform !== undefined || json !== undefined ) {

			//Normalize strings to JSON objects if necessary
			var obj = typeof json === 'string' ? JSON.parse(json) : json;
			
			//Transform the object (using the options)
			out = json2html._transform(obj, transform, options);
		}
		
		//determine if we need the events
		// otherwise return just the html string
		if(options.events) return(out);
			else return( out.html );
	},
	
	/* ---------------------------------------- Private Methods ------------------------------------------------ */
	
	//Extend options
	'_extend':function(obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	},
	
	//Append results
	'_append':function(obj1,obj2) {
		var out = {'html':'','event':[]};
		if(typeof obj1 !== 'undefined' && typeof obj2 !== 'undefined') {
			out.html = obj1.html + obj2.html;

			out.events = obj1.events.concat(obj2.events);
		}

		return(out);
	},
	
	//Transform object
	'_transform':function(json, transform, options) {
		
		var elements = {'events':[],'html':''};
		
		//Determine the type of this object
		if(Array.isArray(json)) {
			
			//Itterrate through the array and add it to the elements array
			var len=json.length;
			for(var j=0;j<len;++j) {	
				//Apply the transform to this object and append it to the results
				elements = json2html._append(elements,json2html._apply(json[j], transform, j, options));
			}

		} else if(typeof json === 'object') {

			//Apply the transform to this object and append it to the results
			elements = json2html._append(elements,json2html._apply(json, transform, undefined, options));
		}

		//Return the resulting elements
		return(elements);		
	},

	//Apply the transform at the second level
	'_apply':function(obj, transform, index, options) {

		var element = {'events':[],'html':''};
		
		//Itterate through the transform and create html as needed
		if(Array.isArray(transform)) {
			
			var t_len = transform.length;
			for(var t=0; t < t_len; ++t) {
				//transform the object and append it to the output
				element = json2html._append(element,json2html._apply(obj, transform[t], index, options));
			}

		} else if(typeof transform === 'object') {

			//Get the tag element of this transform
			if( transform.tag !== undefined ) {

				//Create a new element
				element.html += '<' + transform.tag;
				
				//Create a new object for the children
				var children = {'events':[],'html':''};
				
				//innerHTML
				var html;

				//Look into the properties of this transform
				for (var key in transform) {

					switch(key) {
						case 'tag':
							//Do nothing as we have already created the element from the tag
						break;

						case 'children':
							//Add the children
							if(Array.isArray(transform.children)) {

								//Apply the transform to the children
								children = json2html._append(children,json2html._apply(obj, transform.children, index, options));
							} else if(typeof transform.children === 'function') {
								
								//Get the result from the function
								var temp = transform.children.call(obj, obj, index);

								//Make sure we have an object result with the props
								// html (string), events (array)
								// OR a string (then just append it to the children
								if(typeof temp === 'object') {
									//make sure this object is a valid json2html response object
									if(temp.html !== undefined && temp.events !== undefined) children = json2html._append(children,temp);
								} else if(typeof temp === 'string') {

									//append the result directly to the html of the children
									children.html += temp;
								}
							}
						break;

						case 'html':
							//Create the html attribute for this element
							html = json2html._getValue(obj,transform,'html',index);
						break;

						default:
							//Add the property as a attribute if it's not a key one
							var isEvent = false;
							
							//Check if the first two characters are 'on' then this is an event
							if( key.length > 2 )
								if(key.substring(0,2).toLowerCase() == 'on') {
									
									//Determine if we should add events
									if(options.events) {

										//if so then setup the event data
										var data = {
											'action':transform[key],
											'obj':obj,
											'data':options.eventData,
											'index':index
										};
										
										//create a new id for this event
										var id = json2html._guid();

										//append the new event to this elements events
										element.events[element.events.length] = {'id':id,'type':key.substring(2),'data':data};

										//Insert temporary event property (json2html-event-id) into the element
										element.html += " json2html-event-id='" + id + "'";
									}
									//this is an event
									isEvent = true;
								}

							//If this wasn't an event AND we actually have a value then add it as a property
							if( !isEvent){
								var val = json2html._getValue(obj, transform, key, index);
								
								if(val !== undefined) element.html += ' ' + key + '="' + val.replace(/"/g, '&quot;') + '"';

							}
						break;
					}
				}

				//close the opening tag
				element.html += '>';
				
				//add the innerHTML (if we have any)
				if(html) element.html += html;

				//add the children (if we have any)
				element = json2html._append(element,children);

				//add the closing tag
				element.html += '</' + transform.tag + '>';
			}
		}
		
		//Return the output object
		return(element);
	},

	//Get a new GUID (used by events)
	'_guid':function() {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4());
	},

	//Get the html value of the object
	'_getValue':function(obj, transform, key,index) {
		
		var out = '';
		
		var val = transform[key];
		var type = typeof val;
		
		if (type === 'function') {
			return(val.call(obj,obj,index));
		} else if (type === 'string') {
			var _tokenizer = new json2html._tokenizer([
				/\$\{([^\}\{]+)\}/
			],function( src, real, re ){
				return real ? src.replace(re,function(all,name){
					
					//Split the string into it's seperate components
					var components = name.split('.');

					//Set the object we use to query for this name to be the original object
					var useObj = obj;

					//Output value
					var outVal = '';
					
					//Parse the object components
					var c_len = components.length;
					for (var i=0;i<c_len;++i) {

						if( components[i].length > 0 ) {

							var newObj = useObj[components[i]];
							useObj = newObj;
							if(useObj === null || useObj === undefined) break;
						}
					}
					
					//As long as we have an object to use then set the out
					if(useObj !== null && useObj !== undefined) outVal = useObj;

					return(outVal);
				}) : src;
			});
			
			out = _tokenizer.parse(val).join('');
		}

		return(out);
	},
	
	//Tokenizer
	'_tokenizer':function( tokenizers, doBuild ){

		if( !(this instanceof json2html._tokenizer ) )
			return new json2html._tokenizer( tokenizers, doBuild );
			
		this.tokenizers = tokenizers.splice ? tokenizers : [tokenizers];
		if( doBuild )
			this.doBuild = doBuild;

		this.parse = function( src ){
			this.src = src;
			this.ended = false;
			this.tokens = [ ];
			do {
				this.next();
			} while( !this.ended );
			return this.tokens;
		};
		
		this.build = function( src, real ){
			if( src )
				this.tokens.push(
					!this.doBuild ? src :
					this.doBuild(src,real,this.tkn)
				);	
		};

		this.next = function(){
			var self = this,
				plain;
				
			self.findMin();
			plain = self.src.slice(0, self.min);
			
			self.build( plain, false );
				
			self.src = self.src.slice(self.min).replace(self.tkn,function( all ){
				self.build(all, true);
				return '';
			});
			
			if( !self.src )
				self.ended = true;
		};

		this.findMin = function(){
			var self = this, i=0, tkn, idx;
			self.min = -1;
			self.tkn = '';
			
			while(( tkn = self.tokenizers[i++]) !== undefined ){
				idx = self.src[tkn.test?'search':'indexOf'](tkn);
				if( idx != -1 && (self.min == -1 || idx < self.min )){
					self.tkn = tkn;
					self.min = idx;
				}
			}
			if( self.min == -1 )
				self.min = self.src.length;
		};
	}
};
