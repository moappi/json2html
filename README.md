What is json2html?
------------------
json2html is a simple but powerful javascript HTML templating library used to transform JSON objects into HTML. 

Check out our website <a href='http://www.json2html.com'>www.json2html.com</a> for more information including detailed usage notes, interactive examples and more!

Why json2html?
--------------
Instead of writing HTML templates json2html relies on JSON transforms to convert a source JSON objects to html.  The benefit of using a JSON transform is that they are already readable by the browser/server and DO NOT require any compilation before use.   In addition, json2html allows the following:

+	One template (we call transform) that can be used on either a client OR server
+	Short hand notation for mapping data objects to markup ${name}
+	Event binding to DOM objects (with jquery)
+	Use of inline functions to allow for complex logic during transformation 
+	No compilation required

Example
--------------
Transform (template)
```javascript
var transform = 
 {"<>": "li", "id":"${id}", "html":[
	{"<>": "span", "text": "${name} (${year})"}
  ]};		
```
Plus JSON Data
```javascript
var data = 
 {"id": 1123, "name": "Jack and Jill", "year":2001};		
```

Will render the following html

```html
<li id="1123">
	<span>Jack and Jill (2001)</span>
</li>	
```

json2html for jQuery
=========
Use seemlessly with jQuery, oh did we also mention that you can embed events in your transforms?  Forget attaching your events after you've rendered your templates.

```javascript
var transform = 
 {"<>":"li","id":"${id}","html":[
	{"<>":"span","html":"${name} ${year}"}
  ],"onclick":funciton(e){
	alert("You just clicked " + e.obj.name);
  }};		
```
Will render into the following html and will alert when clicked :)

```html
<li id=1123>
	<span>Jack and Jill (2001)</span>
</li>	
```

json2html for Node.js
=========
Use seemlessly with Node.js

Installation
------------

	npm install node-json2html


Usage
-----
```javascript
	var json2html = require('node-json2html');

	var data = [{'male':'Bob','female':'Jane'},{'male':'Rick','female':'Ann'}];

	var transform = {"<>":"div","html":"${male} likes ${female}"};
        
	var html = json2html.transform(data,transform);
```

How do I start?
--------------
Check out our website <a href='http://www.json2html.com'>www.json2html.com</a> for more information including detailed usage notes, downloadable examples and more!


