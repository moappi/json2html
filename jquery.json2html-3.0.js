//Copyright (c) 2011 Crystalline Technologies
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

(function($){	

	//Main method
	$.fn.json2html = function(JSON, transform, options){	

		var JSONObject;
		var type = jQuery.type(JSON);

		//Convert the string to a json object
		switch( type )
		{
			case 'string':
				JSONObject = jQuery.parseJSON(JSON);
			break;

			default:
				JSONObject = JSON;
			break;

		}
		
		//Extend the options (with defaults)
		if( options != undefined ) $.extend($.json2html.options, options);
		
		//Make sure to take care of any chaining
		return this.each(function(){ 
		    if( $.json2html.options.prepend ) $.fn.prepend.apply($(this),$.json2html(JSONObject, transform));
			else  $.fn.append.apply($(this),$.json2html(JSONObject, transform));
		});
		
	}
		
		//Perform the transformation
		$.json2html = function(json, transform)
		{
			var type = jQuery.type(json);

			if( transform == null ) return(null);

			var elements = [];

			//Determine the type of this object
			switch(type)
			{
				case 'array':

					//Itterrate through the array and add it to the elements array
					var len=json.length;
					for(var j=0;j<len;++j)
					{	
						//Concat the return elements from this objects tranformation
						elements = elements.concat($.json2html.apply(json[j],transform,j));

					}
				break;

				case 'object':
					//Concat the return elements from this objects tranformation
					elements = elements.concat($.json2html.apply(json,transform));
				break;
			}

			//Return the element array
			return( elements );
		}
		
		//Default Options
		$.json2html.options = 
		{
			'eventData': null,
			'prepend':false
		}

		//Apply the transform (at the first level)
		$.json2html.apply = function(json,transform,index)
		{
			var elements = [];
			i = 0;

			var objs = $.json2html.applyTransform(json, transform,index);
					
			var objType = jQuery.type(objs);
			
			//Flatten the return object
			switch (objType)
			{
				case 'array':
					elements = elements.concat(objs);
					i += objs.length;
				break;

				default:
					elements[i] = objs;
					i++;
				break;
			}

			return(elements);
		}

		//Apply the transform at the second level
		$.json2html.applyTransform = function(obj,transform,index)
		{
			//var html = $(document.createElement('div'));
			var objects = [];
			var i = 0;
			var type = jQuery.type(transform);

			//Itterate through the transform and create html as needed
			switch(type)
			{
				case 'array':
					var t_len = transform.length;
					for(var t=0; t < t_len; ++t)
						objects = objects.concat($.json2html.applyTransform(obj, transform[t], index));
				break;

				case 'object':
					//Get the tag element of this transform
					var tag = transform['tag'];
					if( tag != null )
					{
						//Create a new element
						var element = $(document.createElement(tag));

						//Look into the properties of this transform
						for (var key in transform) 
						{
							switch(key)
							{
								case 'tag':
									//Do nothing as we have already created the element from the tag
								break;

								case 'children':

									//Add the children
									var children = transform['children'];
									var c_type = jQuery.type(children);

									switch( c_type )
									{
										case 'function':
											$.fn.append.apply($(element),children(obj));
										break;

										case 'array':													
											$.fn.append.apply($(element),$.json2html.applyTransform(obj, transform['children'], index));
										break;

										default:
											//We only accept array's and functions for children
										break;
									}
									
								break;

								case 'html':
									//Create the html attribute
									$(element).html($.json2html.getValue(obj,transform,'html',index));
								break;

								default:
									//Add the property as a attribute if it's not a key one
									var isEvent = false;
									
									//Check if the first two characters are 'on' then this is an event
									if( key.charAt(0) === 'o' )
										if( key.charAt(1) === 'n')
											{	
												var data = {
													'action':transform[key],
													'obj':obj,
													'data':$.json2html.options.eventData,
													'index':index
												};

												//Bind the event to the element
												$(element).bind(key.substring(key.indexOf('on')+2),data, function(event) 
												{
													data.event = event;
													data.action(data);
												});

												isEvent = true;
											}
									
									//If this wasn't an even the add it as an attribute
									if( !isEvent ) $(element).attr(key, $.json2html.getValue(obj, transform, key,index));
								break;
							}
						}

						//Return the newly created element
						objects[i] = element;
						i++;
					}
				break;
			}
			
			return(objects);
		}

		//Get the html value of the object
		$.json2html.getValue = function(obj, transform, key,index)
		{
			var out = '';
			
			var val = transform[key];
			var type = jQuery.type(val);
			
			switch(type)
			{
				case 'function':
					return(val(obj,index));
				break;

				case 'string':
						var _tokenizer = new $.json2html.tokenizer([
							/\${([^\}\{]+)}/
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
								for (var i=0;i<c_len;++i)
								{
									if( components[i].length > 0 )
									{
										var newObj = useObj[components[i]];
										useObj = newObj;
										if(useObj == null || useObj == undefined) break;
									}
								}
								
								//As long as we have an object to use then set the out
								if(useObj != null && useObj != undefined) outVal = useObj;

							    return(outVal);
							}) : src;
						  }
						);
						
						out = _tokenizer.parse(val).join('');
				break;
			}

			return(out);
		}
		
		//Tokenizer
		$.json2html.tokenizer = function( tokenizers, doBuild ){

			if( !(this instanceof $.json2html.tokenizer ) )
				return new $.json2html.tokenizer( tokenizers, onEnd, onFound );
				
			this.tokenizers = tokenizers.splice ? tokenizers : [tokenizers];
			if( doBuild )
				this.doBuild = doBuild;

			this.parse = function( src ){
				this.src = src;
				this.ended = false;
				this.tokens = [ ];
				do this.next(); while( !this.ended );
				return this.tokens;
			}
			
			this.build = function( src, real ){
				if( src )
					this.tokens.push(
						!this.doBuild ? src :
						this.doBuild(src,real,this.tkn)
					);	
			}

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
			}

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
			}
		}

})(jQuery);

