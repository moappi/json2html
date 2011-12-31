JSON2HTML
=========

What is json2html?
------------------
json2html is a simple but powerful jQuery plug-in used to transform JSON to HTML. 

Why json2html?
--------------
Instead of writing HTML templates JSON2HTML relies on JSON transforms to convert a source JSON objects to html.  The benefit of using a JSON transform is that they are already readable by the browser and DO NOT require any compilation before use.   In addition, JSON2HTML allows the following

+	Short hand notation for mapping data objects to markup
+	Event binding to DOM objects
+	Use of inline functions to allow for complex logic during transformation 

Example of a Transform?
--------------
```javascript
var transform = 
 {tag:'li',id:'.id',children:[
	{tag:'span',html:'.name},
	{tag:'span',html:function(obj){return(' ('+obj.year+')');}}
  ]};		
```
Will render into the following html

```html
<li id=1123>
	<span>Jack and Jill</span>
	<span>( 2001 )</span>
</li>	
```

Where is the project now?
--------------
json2html is still in beta version, however it is being used in production on a number of projects.   Performance wise it's comparable to jQuery templates (around 20% slower).  Any additions/improvements are very much welcome!

How do I start?
--------------
Check out our website <a href='http://www.json2html.com'>www.json2html.com</a> for more information including detailed usage notes, downloadable examples and more!

