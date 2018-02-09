json2html core
=========

Readme First!
--------------
Looks like you've found the json2html core library repository.  This repository is used for making changes to the core json2html library.  While you're free to use this core json2html library we recommend that you use the following wrappers instead:

+	<a href='https://github.com/moappi/jquery.json2html'>jQuery wrapper</a>  for extended client side functionality 
+	<a href='https://github.com/moappi/node-json2html'>node.js wrapper</a> for server side functionality


What is json2html?
------------------
json2html is a simple but powerful javascript HTML templating library used to transform JSON objects into HTML. 

Why json2html?
--------------
Instead of writing HTML templates json2html relies on JSON transforms to convert a source JSON objects to html.  The benefit of using a JSON transform is that they are already readable by the browser/server and DO NOT require any compilation before use.   In addition, json2html allows the following:

+	One template (we call transform) that can be used on either a client OR server
+	Short hand notation for mapping data objects to markup ${name}
+	Event binding to DOM objects (with the jquery plugin)
+	Use of inline functions to allow for complex logic during transformation 

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

Need more Information?
--------------
Check out our website <a href='http://www.json2html.com'>www.json2html.com</a> for more information including detailed usage notes, interactive examples and more!




