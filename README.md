
json2html
------------------

json2html is an open source javascript library that uses js templates to render JSON objects into HTML.

Build lightning fast, interactive client side templates using nothing but javascript.

Free to use under the MIT license.

<a href='http://www.json2html.com'>www.json2html.com</a> for full documentation.

Features
--------------

+   Native JS templates that work both the client and server
+   Interactive with embedded events directly in your templates
+   100% Javascript so no need to learn any new syntax: use inline js functions for complex logic

Example
--------------
```javascript
json2html.render(
    [
        {"name": "Justice League", "year":2021},
        {"name": "Coming 2 America", "year":2021}
    ], 
    {"<>": "li", "html":[
    	{"<>": "span", "text": "${name} (${year})"}
      ]});
    
```

Will render the following html

```html
<li>
	<span>Justice League (2021)</span>
</li>
<li>
	<span>Coming 2 America (2021)</span>
</li
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
        
	let html = json2html.transform([{'male':'Bob','female':'Jane'},{'male':'Rick','female':'Ann'}],{"<>":"div","html":"${male} likes ${female}"});
```

TypeScript:
```javascript
  import json2html from 'node-json2html'; //Import module
  const { render, component } = json2html; // Import methods from Json2html
```

<a href='http://www.json2html.com'>www.json2html.com</a> for full documentation.
