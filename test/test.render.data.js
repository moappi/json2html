module.exports = 
[
    // ============================== Rendering Different Data Input ===========================
    
    //Object
    {
        "name":"Render Data - Object",
        "data":{"name":"ashley"},
        "template":{"<>":"div","html":"${name}"},
        "html":"<div>ashley</div>"
    },
    
    //Undefined
    {
        "name":"Render Data - Undefined",
        "data":undefined,
        "template":{"<>":"div","html":"${name}"},
        "html":""
    },

	//Special characters in variable name $ _ - space
    {
        "name":"Render Data - Special Characters ($_-)",
        "data":{"$var":"$","_var":"_"," var":"space","-var":"-"},
        "template":{"<>":"div","html":"${$var} ${_var} ${ var} ${-var}"},
        "html":"<div>$ _ space -</div>"
    },
    
    //Object Array
    {
        "name":"Render Data - Array",
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":{"<>":"div","html":"${name}"},
        "html":"<div>ashley</div><div>monica</div>"
    },
    
    //Literal Array
    {
        "name":"Render Data - Literal Array (Short Hand Literal)",
        "data":["ashley","monica"],
        "template":{"<>":"div","html":"${index}-${value}"},
        "html":"<div>0-ashley</div><div>1-monica</div>"
    },
    
    {
        "name":"Render Data - Literal Array (Inline Function - this)",
        "data":["ashley","monica"],
        "template":{"<>":"div","html":function(obj,index){return(index + "-" + this);}},
        "html":"<div>0-ashley</div><div>1-monica</div>"
    },
    
    {
        "name":"Render Data - Literal Array (Inline Function - (obj,index))",
        "data":["ashley","monica"],
        "template":{"<>":"div","html":(obj,index)=>(index + "-" + obj)},
        "html":"<div>0-ashley</div><div>1-monica</div>"
    },
    
    //Data - Literal
    {
        "name":"Data - Literal",
        "data":"ashley",
        "template":{"<>":"div"},
        "html":""
    },
    
    // ============================== Non HTML Element (Block) ===========================
    {
        "name":"Block - Literal HTML",
        "data":{"name":"ashley"},
        "template":{"html":"<p>${name}</p>"},
        "html":"<p>ashley</p>"
    },
    
    {
        "name":"Block - Inline Function HTML (this)",
        "data":{"name":"ashley"},
        "template":{"html":function(){
            return("<p>" + this.name +"</p>");
        }},
        "html":"<p>ashley</p>"
    },
    
    {
        "name":"Block - Inline Function HTML (obj)",
        "data":{"name":"ashley"},
        "template":{"html":(o)=>("<p>" + o.name +"</p>")},
        "html":"<p>ashley</p>"
    },
    
    {
        "name":"Block - Array Templates",
        "data":{"name":"ashley"},
        "template":{"html":[
            {"<>":"p","html":"${name}"}
        ]},
        "html":"<p>ashley</p>"
    },
    
    {
        "name":"Block - Sub Data (this)",
        "data":{"employee":{"name":"ashley"}},
        "template":{"{}":function(){return(this.employee);},"html":"<p>${name}</p>"},
        "html":"<p>ashley</p>"
    },
    
    {
        "name":"Block - Sub Data (obj)",
        "data":{"employee":{"name":"ashley"}},
        "template":{"{}":o=>o.employee,"html":"<p>${name}</p>"},
        "html":"<p>ashley</p>"
    },
    
    {
        "name":"Block - Literal Text",
        "data":{"name":"ashley"},
        "template":{"text":"${name}"},
        "html":"ashley"
    },
    
    // ============================== Reserved Attributes ===========================
    //<> Attribute
    {
        "name":"<> Attribute - Literal",
        "data":{},
        "template":{"<>":"div"},
        "html":"<div></div>"
    },
    {
        "name":"<> Attribute - Function",
        "data":{},
        "template":{"<>":o=>"div"},
        "html":"<div></div>"
    },
    {
        "name":"<> Attribute - Dynamic",
        "data":{"element":"div","employee":{"name":"ashley"}},
        "template":{"<>":"${element}","{}":o=>o.employee,"text":"${name}"},
        "html":"<div>ashley</div>"
    },
    
    //HTML Attribute
    {
        "name":"HTML Attribute - Nested Elements",
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":{"<>":"div","html":[{"<>":"span","html":"-"},{"<>":"strong","html":"${name}"}]},
        "html":"<div><span>-</span><strong>ashley</strong></div><div><span>-</span><strong>monica</strong></div>"
    },
    {
        "name":"HTML Attribute - Array Template",
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":[{"<>":"span","html":"-"},{"<>":"strong","html":"${name}"}],
        "html":"<span>-</span><strong>ashley</strong><span>-</span><strong>monica</strong>"
    },
    {
        "name":"HTML Attribute - Object",
        "data":{},
        "template":{"<>":"div","html":{"name":"ashley"}},
        "html":"<div></div>"
    },
    {
        "name":"HTML Attribute - Inline Function (this / string)",
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":{"<>":"div","html":function(){return(this.name)}},
        "html":"<div>ashley</div><div>monica</div>"
    },
    {
        "name":"HTML Attribute - Inline Function (this / number)",
        "data":[{"val":1},{"val":2}],
        "template":{"<>":"div","html":function(){return(this.val)}},
        "html":"<div>1</div><div>2</div>"
    },
    {
        "name":"HTML Attribute - Inline Function (this / array)",
        "data":{"array":["ashley","monica"]},
        "template":{"<>":"div","html":function(){return(this.array)}},
        "html":"<div>ashley,monica</div>"
    },
    {
        "name":"HTML Attribute - Inline Function (this / obj)",
        "data":{"object":{"name":"ashley"}},
        "template":{"<>":"div","html":function(){return(this.object)}},
        "html":"<div></div>"
    },
    {
        "name":"HTML Attribute - Inline Function (obj / array)",
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":{"<>":"div","html":(o,index)=>(index + "-" + o.name)},
        "html":"<div>0-ashley</div><div>1-monica</div>"
    },
    
    {
        "name":"HTML Attribute - Inline Function (obj - object)",
        "data":{"name":"ashley"},
        "template":{"<>":"div","html":(o,index)=>(index + "-" + o.name)},
        "html":"<div>undefined-ashley</div>"
    },
    
    //TEXT Attribute - Literal
    {
        "name":"Text Attribute - Literal (Non HTML String)",
        "data":{"text":"ashley"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>ashley</div>"
    },
    {
        "name":"Text Attribute - Literal (HTML String)",
        "data":{"text":"<div>ashley</div>"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>&lt;div&gt;ashley&lt;&#x2F;div&gt;</div>"
    },
    {
        "name":"Text Attribute Literal (Script XSS Attack)",
        "data":{"text":"<script>console.log('xss');</script>"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>&lt;script&gt;console.log(&#39;xss&#39;);&lt;&#x2F;script&gt;</div>"
    },
    {
        "name":"Text Attribute - Literal (All Special Characters)",
        "data":{"text":"&<>\"'\/"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>&amp;&lt;&gt;&quot;&#39;&#x2F;</div>"
    },
    
    //TEXT Attribute - Inline Function (this)
    {
        "name":"Text Attribute - Inline Function (this / Non HTML String)",
        "data":{"text":"ashley"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>ashley</div>"
    },
    {
        "name":"Text Attribute - Inline Function (this / HTML String)",
        "data":{"text":"<div>ashley</div>"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>&lt;div&gt;ashley&lt;&#x2F;div&gt;</div>"
    },
    {
        "name":"Text Attribute - Inline Literal (this / Script XSS Attack)",
        "data":{"text":"<script>console.log('xss');</script>"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>&lt;script&gt;console.log(&#39;xss&#39;);&lt;&#x2F;script&gt;</div>"
    },
    {
        "name":"Text Attribute - Inline Literal (this / All Special Characters)",
        "data":{"text":"&<>\"'\/"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>&amp;&lt;&gt;&quot;&#39;&#x2F;</div>"
    },
    
    //TEXT Attribute - Inline Function (obj)
    {
        "name":"Text Attribute - Inline Function (obj / Non HTML String)",
        "data":{"text":"ashley"},
        "template":{"<>":"div","text":o=>o.text},
        "html":"<div>ashley</div>"
    },
    {
        "name":"Text Attribute - Inline Function (obj / HTML String)",
        "data":{"text":"<div>ashley</div>"},
        "template":{"<>":"div","text":o=>o.text},
        "html":"<div>&lt;div&gt;ashley&lt;&#x2F;div&gt;</div>"
    },
    {
        "name":"Text Attribute - Inline Literal (obj / Script XSS Attack)",
        "data":{"text":"<script>console.log('xss');</script>"},
        "template":{"<>":"div","text":o=>o.text},
        "html":"<div>&lt;script&gt;console.log(&#39;xss&#39;);&lt;&#x2F;script&gt;</div>"
    },
    {
        "name":"Text Attribute - Inline Literal (obj / All Special Characters)",
        "data":{"text":"&<>\"'\/"},
        "template":{"<>":"div","text":o=>o.text},
        "html":"<div>&amp;&lt;&gt;&quot;&#39;&#x2F;</div>"
    },
    
    //TEXT Attribute - Inline Function (obj,index)
    {
        "name":"Text Attribute - Inline Function (Array / obj,index)",
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":{"<>":"div","text":(o,i)=>(i + "-" + o.name)},
        "html":"<div>0-ashley</div><div>1-monica</div>"
    },
    
    {
        "name":"Text Attribute - Inline Function (Object / obj,index)",
        "data":{"name":"ashley"},
        "template":{"<>":"div","text":(o,i)=>(i + "-" + o.name)},
        "html":"<div>undefined-ashley</div>"
    },
    
    //DOM Attribute
    {
        "name":"DOM Attribute - Literal",
        "data":{},
        "template":{"<>":"div","class":"bold"},
        "html":"<div class=\"bold\"></div>"
    },
    {
        "name":"DOM Attribute - Short Hand Literal",
        "data":{"class":"bold"},
        "template":{"<>":"div","class":"${class}"},
        "html":"<div class=\"bold\"></div>"
    },
    {
        "name":"DOM Attribute - Inline Function (this)",
        "data":{"class":"bold"},
        "template":{"<>":"div","class":function(){return(this.class);}},
        "html":"<div class=\"bold\"></div>"
    },
    {
        "name":"DOM Attribute - Inline Function (Array / (obj,index))",
        "data":[{"attr":"data"}],
        "template":{"<>":"div","data-attr":(o,i)=>(i + "-" + o.attr)},
        "html":"<div data-attr=\"0-data\"></div>"
    },
    
    {
        "name":"DOM Attribute - Inline Function (Object - (obj,index))",
        "data":{"attr":"data"},
        "template":{"<>":"div","data-attr":(o,i)=>(i + "-" + o.attr)},
        "html":"<div data-attr=\"undefined-data\"></div>"
    },
    
    //{} Attribute
    {
        "name":"{} Attribute - Literal Object (NOT SUPPORTED)",
        "data":{"employee":{"name":"ashley"}},
        "template":{"<>":"div","{}":"employee","html":"${name}"},
        "html":"<div></div>"
    },
    
    {
        "name":"{} Attribute - Undefined",
        "data":{"employee":{"name":"ashley"}},
        "template":{"<>":"div","{}":o=>undefined},
        "html":""
    },
    
    {
        "name":"{} Attribute - Inline Function (Object / this)",
        "data":{"employee":{"name":"ashley"}},
        "template":{"<>":"div","{}":function(){return(this.employee);},"html":"${name}"},
        "html":"<div>ashley</div>"
    },
    
    {
        "name":"{} Attribute - Inline Function (Object / obj)",
        "data":{"employee":{"name":"ashley"}},
        "template":{"<>":"div","{}":o=>o.employee,"html":"${name}"},
        "html":"<div>ashley</div>"
    },
    
    {
        "name":"{} Attribute - Inline Function (Array / this)",
        "data":{"employees":[{"name":"ashley"},{"name":"monica"}]},
        "template":{"<>":"div","{}":function(){return(this.employees);},"html":"${name}"},
        "html":"<div>ashley</div><div>monica</div>"
    },
    
    {
        "name":"{} Attribute - Inline Function (Array / obj)",
        "data":{"employees":[{"name":"ashley"},{"name":"monica"}]},
        "template":{"<>":"div","{}":o=>o.employees,"html":"${name}"},
        "html":"<div>ashley</div><div>monica</div>"
    },
    
    {
        "name":"{} Attribute - Embedded (Inline Function Array)",
        "data":{"employees":[{"name":"ashley"},{"name":"monica"}]},
        "template":{"<>":"ul","html":[
            {"<>":"li","{}":o=>o.employees,"html":"${name}"}
        ]},
        "html":"<ul><li>ashley</li><li>monica</li></ul>"
    },
    
    {
        "name":"{} Attribute - Embedded (Object)",
        "data":{},
        "template":{"<>":"ul","html":[
            {"<>":"li","{}":{"name":"ashley"},"text":"${name}"}
        ]},
        "html":"<ul><li>ashley</li></ul>"
    },
    
    {
        "name":"{} Attribute - Embedded (Array)",
        "data":{},
        "template":{"<>":"ul","html":[
            {"<>":"li","{}":[{"name":"ashley"},{"name":"monica"}],"html":[
                {"<>":"span","text":"${name}"},
                {"<>":"i","text":(o,i,p)=>i}
            ]}
        ]},
        "html":"<ul><li><span>ashley</span><i>0</i></li><li><span>monica</span><i>1</i></li></ul>"
    },
    
    {
        "name":"{} Attribute - Embedded Children x2 (Inline Function Array)",
        "data":{"departments":[{"name":"catering","employees":["ashley","monica"]},{"name":"finance","employees":["monica"]}]},
        "template":{"<>":"ul","html":[
            {"<>":"li","{}":o=>o.departments,"html":[
                {"<>":"h1","html":"${name}"},
                {"<>":"div","{}":o=>o.employees,"html":[
                    {"<>":"span","html":"${value}"}
                ]}
            ]}
        ]},
        "html":"<ul><li><h1>catering</h1><div><span>ashley</span></div><div><span>monica</span></div></li><li><h1>finance</h1><div><span>monica</span></div></li></ul>"
    },
    
    {
        "name":"obj DEPRECATED Attribute - Inline Function (Object - this)",
        "data":{"employee":{"name":"ashley"}},
        "template":{"<>":"div","{}":function(){return(this.employee);},"html":"${name}"},
        "html":"<div>ashley</div>"
    },
    
    //Void Elements
    {
        "name":"Void Element - area",
        "data":{},
        "template":{"<>":"area","attr":"test","html":"not displayed"},
        "html":"<area attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - base",
        "data":{},
        "template":{"<>":"base","attr":"test","html":"not displayed"},
        "html":"<base attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - br",
        "data":{},
        "template":{"<>":"br","attr":"test","html":"not displayed"},
        "html":"<br attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - col",
        "data":{},
        "template":{"<>":"col","attr":"test","html":"not displayed"},
        "html":"<col attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - command",
        "data":{},
        "template":{"<>":"command","attr":"test","html":"not displayed"},
        "html":"<command attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - embed",
        "data":{},
        "template":{"<>":"embed","attr":"test","html":"not displayed"},
        "html":"<embed attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - hr",
        "data":{},
        "template":{"<>":"hr","attr":"test","html":"not displayed"},
        "html":"<hr attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - img",
        "data":{},
        "template":{"<>":"img","attr":"test","html":"not displayed"},
        "html":"<img attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - input",
        "data":{},
        "template":{"<>":"input","attr":"test","html":"not displayed"},
        "html":"<input attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - keygen",
        "data":{},
        "template":{"<>":"keygen","attr":"test","html":"not displayed"},
        "html":"<keygen attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - link",
        "data":{},
        "template":{"<>":"link","attr":"test","html":"not displayed"},
        "html":"<link attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - meta",
        "data":{},
        "template":{"<>":"meta","attr":"test","html":"not displayed"},
        "html":"<meta attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - param",
        "data":{},
        "template":{"<>":"param","attr":"test","html":"not displayed"},
        "html":"<param attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - source",
        "data":{},
        "template":{"<>":"source","attr":"test","html":"not displayed"},
        "html":"<source attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - track",
        "data":{},
        "template":{"<>":"track","attr":"test","html":"not displayed"},
        "html":"<track attr=\"test\"/>"
    },
    
    {
        "name":"Void Element - wbr",
        "data":{},
        "template":{"<>":"wbr","attr":"test","html":"not displayed"},
        "html":"<wbr attr=\"test\"/>"
    },
    
    //Undefined / Null
    {
        "name":"Special Values - undefined",
        "data":{"val":undefined},
        "template":{"<>":"div","html":"${val}"},
        "html":"<div></div>"
    },
    
    {
        "name":"Special Values - null",
        "data":{"val":null},
        "template":{"<>":"div","html":"${val}"},
        "html":"<div></div>"
    },
    
    //Components
    {
        "name":"Components [A] - Parent Data Array",
        "components":{
            "A/item":{"<>":"div","html":"${name}"}
        },
        "data":[{"name":"ashley"},{"name":"monica"}],
        "template":{"[]":"A/item"},
        "html":"<div>ashley</div><div>monica</div>"
    },
    
    {
        "name":"Components [B] - Parent Sub Array",
        "components":{
            "B/item":{"<>":"li","html":[
                {"<>":"span","html":"${name}"}
            ]}
        },
        "data":{"employees":[{"name":"ashley"},{"name":"monica"}]},
        "template":{"<>":"ul","html":[
            {"[]":"B/item","{}":o=>o.employees}
        ]},
        "html":"<ul><li><span>ashley</span></li><li><span>monica</span></li></ul>"
    },
    
    {
        "name":"Components [C] - Block Wrapper",
        "components":{
            "C/wrapper":{"<>":"section","html":[
	                {"html":(o,i,d,h)=>h}
	           ]}
        },
        "data":{"employee":{"name":"ashley"}},
        "template":{"[]":"C/wrapper","{}":o=>o.employee,"html":[
                {"<>":"span","html":"${name}"}
            ]},
        "html":"<section><span>ashley</span></section>"
    },
    
    {
        "name":"Components [D] - Dynamic Component Name",
        "components":{
            "D/name":{"<>":"span","html":"${name}"}
        },
        "data":{"component":"D/name","employee":{"name":"ashley"}},
        "template":{"[]":"${component}","{}":o=>o.employee},
        "html":"<span>ashley</span>"
    },
    
    {
        "name":"Components [E] - Undefined",
        "components":{
            "E/item":{"<>":"div","html":"${name}"}
        },
        "data":undefined,
        "template":{"[]":"E/item"},
        "html":""
    },
    
    {
        "name":"Components [F] - Object undefined",
        "components":{
            "F/name":{"<>":"span","html":"${name}"}
        },
        "data":{},
        "template":{"[]":"F/name","{}":o=>undefined},
        "html":""
    },
    
    {
        "name":"Components [G] - Simple Property",
        "components":{
            "G/name":{"<>":"span","text":(o,i,p)=>p.name}
        },
        "data":{},
        "template":{"[]":"G/name","name":"chad"},
        "html":"<span>chad</span>"
    },
    
    {
        "name":"Components [H] - Nested Properties",
        "components":{
            "H/name":{"<>":"i","text":(o,i,p)=>p.name},
            "H/user":{"<>":"div","html":[
                        {"<>":"span","text":(o,i,p)=>p.name},
                        {"[]":"H/name"}
                    ]}
        },
        "data":{},
        "template":{"[]":"H/user","name":"chad"},
        "html":"<div><span>chad</span><i></i></div>"
    },
    
    {
        "name":"Components [I] - Shorthand Property",
        "components":{
            "I/name":{"<>":"span","text":"${@name}"}
        },
        "data":{},
        "template":{"[]":"I/name","name":"chad"},
        "html":"<span>chad</span>"
    },
    
    {
        "name":"Components [J] - Nested Properties (Object)",
        "components":{
            "J/text":{"<>":"span","text":"${@text}"},
            "J/user":{"<>":"div","html":[
                        {"<>":"div","text":"${@user.name}"},
                        {"[]":"J/text","text":" "},
                        {"[]":"J/text","text":(o,i,p)=>p.user.name}
                    ]}
        },
        "data":{},
        "template":{"[]":"J/user","user":{"name":"chad"}},
        "html":"<div><div>chad</div><span> </span><span>chad</span></div>"
    },
    
    {
        "name":"Components [K] - Nested Properties (Array)",
        "components":{
            "J/container":{"<>":"ul","html":[
                        {"<>":"li","{}":(o,i,p)=>p.users,"text":"${name}"}
                    ]}
        },
        "data":{},
        "template":{"[]":"J/container","users":[{"name":"ashley"},{"name":"monica"}]},
        "html":"<ul><li>ashley</li><li>monica</li></ul>"
    },
    
    {
        "name":"Components [L] - Empty Property",
        "components":{
            "L/text":{"<>":"span","text":"${@text}"},
        },
        "data":{},
        "template":{"[]":"L/text"},
        "html":"<span></span>"
    }
    
]; 