
json2html
------------------

json2html is an open source javascript library that uses json templates to render JSON objects into HTML.

Build lightning fast, interactive client side templates using nothing but javascript.

Free to use under the MIT license.

<a href='http://www.json2html.com'>www.json2html.com</a> for full documentation.

Features
--------------

+   Native JS templates that work both the client and server
+   Interactive with embedded events directly in your templates
+   Dynamically update parts of your rendered templates when changes occur
+   100% Javascript so no need to learn any new syntax: use inline js functions for complex logic

Example
--------------
```javascript
json2html.render(
    [
        {"name": "Sasha", "age":27},
        {"name": "Bobby", "age":45}
    ], 
    {"<>": "li", "html":[
    	{"<>": "span", "text": "${name} (${age} years old)"}
      ]});
    
```

Will render the following html

```html
<li>
	<span>Sasha (27 years old)</span>
</li>
<li>
	<span>Bobby (45 years old)</span>
</li>
```

jQuery
=========
Use seemlessly with jQuery, oh did we also mention that you can embed events in your template?  Forget attaching your events after you've rendered your templates.

```javascript
 {"<>":"button","text":"Click Me","onclick":(e)=>{
	alert("You just clicked this");
  }};		
```
Will render into the following html and will alert when clicked :)

```html
<button>Click Me</button>
```

Node.js
=========
Use your temlpates seemlessly on Node.js

Installation
------------

	npm install node-json2html


Usage
-----
```javascript
	const json2html = require('node-json2html');
        
	let html = json2html.transform([{'name':'Bob','fruit':'Bananas'},{'name':'Rick','fruit':'Apples'}],{"<>":"div","text":"${name} likes ${fruit}"});
```

TypeScript:
```javascript
  import json2html from 'node-json2html'; //Import module
  const { render, component } = json2html; // Import methods from Json2html
```

<a href='http://www.json2html.com'>www.json2html.com</a> for full documentation.
