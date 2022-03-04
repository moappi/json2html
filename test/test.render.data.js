module.exports = 
[
    // ============================== Rendering Different Data Input ===========================
    
    //Object
    {
        "name":"Render Data Object",
        "data":{"name":"dorian"},
        "template":{"<>":"div","html":"${name}"},
        "html":"<div>dorian</div>"
    },
    
    //Undefined
    {
        "name":"Render Data Undefined",
        "data":undefined,
        "template":{"<>":"div","html":"${name}"},
        "html":""
    },

	//Special characters in variable name $ _ space
    {
        "name":"Render Data Special Characters ($_)",
        "data":{"$var":"$","_var":"_"," var":"space"},
        "template":{"<>":"div","html":"${$var} ${_var} ${ var}"},
        "html":"<div>$ _ space</div>"
    },
    
    //Object Array
    {
        "name":"Render Data Array",
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":{"<>":"div","html":"${name}"},
        "html":"<div>dorian</div><div>monica</div>"
    },
    
    //Literal Array
    {
        "name":"Render Data Literal Array (Short Hand Literal)",
        "data":["dorian","monica"],
        "template":{"<>":"div","html":"${index}-${value}"},
        "html":"<div>0-dorian</div><div>1-monica</div>"
    },
    
    {
        "name":"Render Data Literal Array (Inline Function - this)",
        "data":["dorian","monica"],
        "template":{"<>":"div","html":function(obj,index){return(index + "-" + this)}},
        "html":"<div>0-dorian</div><div>1-monica</div>"
    },
    
    {
        "name":"Render Data Literal Array (Inline Function - (obj,index))",
        "data":["dorian","monica"],
        "template":{"<>":"div","html":function(obj,index){return(index + "-" + obj)}},
        "html":"<div>0-dorian</div><div>1-monica</div>"
    },
    
    //Data - Literal
    {
        "name":"Data - Literal",
        "data":"dorian",
        "template":{"<>":"div"},
        "html":""
    },
    
    // ============================== Rendering Options ===========================
    
    {
        "name":"Rendering Options (Data Object)",
        "data":{},
        "template":{"<>":"environment","html":function(obj,index,data){
            return(data.env);
        }},
        "html":"<environment>development</environment>",
        "options":{"data":{"env":"development"}}
    },
    
    // ============================== Non HTML Element (Block) ===========================
    {
        "name":"Block (Literal HTML)",
        "data":{"name":"dorian"},
        "template":{"html":"<p>${name}</p>"},
        "html":"<p>dorian</p>"
    },
    
    {
        "name":"Block(Inline Function HTML)",
        "data":{"name":"dorian"},
        "template":{"html":function(){
            return("<p>" + this.name +"</p>");
        }},
        "html":"<p>dorian</p>"
    },
    
    {
        "name":"Block (Array Templates)",
        "data":{"name":"dorian"},
        "template":{"html":[
            {"<>":"p","html":"${name}"}
        ]},
        "html":"<p>dorian</p>"
    },
    
    {
        "name":"Block (Sub Data Object)",
        "data":{"employee":{"name":"dorian"}},
        "template":{"{}":function(){return(this.employee);},"html":"<p>${name}</p>"},
        "html":"<p>dorian</p>"
    },
    
    {
        "name":"Block (Literal Text)",
        "data":{"name":"dorian"},
        "template":{"text":"${name}"},
        "html":"dorian"
    },
    
    // ============================== Reserved Attributes ===========================
    //<> Attribute
    {
        "name":"<> Attribute (Literal)",
        "data":{},
        "template":{"<>":"div"},
        "html":"<div></div>"
    },
    {
        "name":"<> Attribute (Function)",
        "data":{},
        "template":{"<>":function(){return("div");}},
        "html":"<div></div>"
    },
    {
        "name":"<> Attribute (Dynamic)",
        "data":{"element":"div","employee":{"name":"dorian"}},
        "template":{"<>":"${element}","{}":function(){return(this.employee);},"text":"${name}"},
        "html":"<div>dorian</div>"
    },
    
    //HTML Attribute
    {
        "name":"HTML Attribute (Nested Elements)",
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":{"<>":"div","html":[{"<>":"span","html":"-"},{"<>":"strong","html":"${name}"}]},
        "html":"<div><span>-</span><strong>dorian</strong></div><div><span>-</span><strong>monica</strong></div>"
    },
    {
        "name":"HTML Attribute (Array Template)",
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":[{"<>":"span","html":"-"},{"<>":"strong","html":"${name}"}],
        "html":"<span>-</span><strong>dorian</strong><span>-</span><strong>monica</strong>"
    },
    {
        "name":"HTML Attribute (Object)",
        "data":{},
        "template":{"<>":"div","html":{"name":"dorian"}},
        "html":"<div></div>"
    },
    {
        "name":"HTML Attribute (Inline Function - this - string)",
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":{"<>":"div","html":function(){return(this.name)}},
        "html":"<div>dorian</div><div>monica</div>"
    },
    {
        "name":"HTML Attribute (Inline Function - this - number)",
        "data":[{"val":1},{"val":2}],
        "template":{"<>":"div","html":function(){return(this.val)}},
        "html":"<div>1</div><div>2</div>"
    },
    {
        "name":"HTML Attribute (Inline Function - this - array)",
        "data":{"array":["dorian","monica"]},
        "template":{"<>":"div","html":function(){return(this.array)}},
        "html":"<div>dorian,monica</div>"
    },
    {
        "name":"HTML Attribute (Inline Function - this - object)",
        "data":{"object":{"name":"dorian"}},
        "template":{"<>":"div","html":function(){return(this.object)}},
        "html":"<div></div>"
    },
    {
        "name":"HTML Attribute (Inline Function (obj,index) - array)",
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":{"<>":"div","html":function(obj,index){return(index + "-" + obj.name)}},
        "html":"<div>0-dorian</div><div>1-monica</div>"
    },
    
    {
        "name":"HTML Attribute (Inline Function (obj,index) - object",
        "data":{"name":"dorian"},
        "template":{"<>":"div","html":function(obj,index){return(index + "-" + obj.name)}},
        "html":"<div>undefined-dorian</div>"
    },
    
    //TEXT Attribute - Literal
    {
        "name":"Text Attribute (Literal - Non HTML String)",
        "data":{"text":"dorian"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>dorian</div>"
    },
    {
        "name":"Text Attribute (Literal - HTML String)",
        "data":{"text":"<div>dorian</div>"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>&lt;div&gt;dorian&lt;&#x2F;div&gt;</div>"
    },
    {
        "name":"Text Attribute (Literal - Script XSS Attack)",
        "data":{"text":"<script>console.log('xss');</script>"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>&lt;script&gt;console.log(&#39;xss&#39;);&lt;&#x2F;script&gt;</div>"
    },
    {
        "name":"Text Attribute (Literal - All Special Characters)",
        "data":{"text":"&<>\"'\/"},
        "template":{"<>":"div","text":"${text}"},
        "html":"<div>&amp;&lt;&gt;&quot;&#39;&#x2F;</div>"
    },
    
    //TEXT Attribute - Inline Function (this)
    {
        "name":"Text Attribute (Inline Function (this) - Non HTML String)",
        "data":{"text":"dorian"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>dorian</div>"
    },
    {
        "name":"Text Attribute (Inline Function (this) - HTML String)",
        "data":{"text":"<div>dorian</div>"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>&lt;div&gt;dorian&lt;&#x2F;div&gt;</div>"
    },
    {
        "name":"Text Attribute (Inline Literal (this) - Script XSS Attack)",
        "data":{"text":"<script>console.log('xss');</script>"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>&lt;script&gt;console.log(&#39;xss&#39;);&lt;&#x2F;script&gt;</div>"
    },
    {
        "name":"Text Attribute (Inline Literal (this) - All Special Characters)",
        "data":{"text":"&<>\"'\/"},
        "template":{"<>":"div","text":function(){return(this.text);}},
        "html":"<div>&amp;&lt;&gt;&quot;&#39;&#x2F;</div>"
    },
    
    //TEXT Attribute - Inline Function (obj)
    {
        "name":"Text Attribute (Inline Function (obj) - Non HTML String)",
        "data":{"text":"dorian"},
        "template":{"<>":"div","text":function(obj){return(obj.text);}},
        "html":"<div>dorian</div>"
    },
    {
        "name":"Text Attribute (Inline Function (obj) - HTML String)",
        "data":{"text":"<div>dorian</div>"},
        "template":{"<>":"div","text":function(obj){return(obj.text);}},
        "html":"<div>&lt;div&gt;dorian&lt;&#x2F;div&gt;</div>"
    },
    {
        "name":"Text Attribute (Inline Literal (obj) - Script XSS Attack)",
        "data":{"text":"<script>console.log('xss');</script>"},
        "template":{"<>":"div","text":function(obj){return(obj.text);}},
        "html":"<div>&lt;script&gt;console.log(&#39;xss&#39;);&lt;&#x2F;script&gt;</div>"
    },
    {
        "name":"Text Attribute (Inline Literal (obj) - All Special Characters)",
        "data":{"text":"&<>\"'\/"},
        "template":{"<>":"div","text":function(obj){return(obj.text);}},
        "html":"<div>&amp;&lt;&gt;&quot;&#39;&#x2F;</div>"
    },
    
    //TEXT Attribute - Inline Function (obj,index)
    {
        "name":"Text Attribute (Inline Function Array - obj,index)",
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":{"<>":"div","text":function(obj,index){return(index + "-" + obj.name)}},
        "html":"<div>0-dorian</div><div>1-monica</div>"
    },
    
    {
        "name":"Text Attribute (Inline Function Object - obj,index)",
        "data":{"name":"dorian"},
        "template":{"<>":"div","text":function(obj,index){return(index + "-" + obj.name)}},
        "html":"<div>undefined-dorian</div>"
    },
    
    //DOM Attribute
    {
        "name":"DOM Attribute (Literal)",
        "data":{},
        "template":{"<>":"div","class":"bold"},
        "html":"<div class=\"bold\"></div>"
    },
    {
        "name":"DOM Attribute (Short Hand Literal)",
        "data":{"class":"bold"},
        "template":{"<>":"div","class":"${class}"},
        "html":"<div class=\"bold\"></div>"
    },
    {
        "name":"DOM Attribute (Inline Function - this)",
        "data":{"class":"bold"},
        "template":{"<>":"div","class":function(){return(this.class);}},
        "html":"<div class=\"bold\"></div>"
    },
    {
        "name":"DOM Attribute (Inline Function Array - (obj,index))",
        "data":[{"attr":"data"}],
        "template":{"<>":"div","data-attr":function(obj,index){return(index + "-" + obj.attr);}},
        "html":"<div data-attr=\"0-data\"></div>"
    },
    
    {
        "name":"DOM Attribute (Inline Function Object - (obj,index))",
        "data":{"attr":"data"},
        "template":{"<>":"div","data-attr":function(obj,index){return(index + "-" + obj.attr);}},
        "html":"<div data-attr=\"undefined-data\"></div>"
    },
    
    //{} Attribute
    {
        "name":"{} Attribute (Literal Object NOT SUPPORTED)",
        "data":{"employee":{"name":"dorian"}},
        "template":{"<>":"div","{}":"employee","html":"${name}"},
        "html":"<div></div>"
    },
    
    {
        "name":"{} Attribute (Undefined)",
        "data":{"employee":{"name":"dorian"}},
        "template":{"<>":"div","{}":function(){return}},
        "html":""
    },
    
    {
        "name":"{} Attribute (Inline Function Object - this)",
        "data":{"employee":{"name":"dorian"}},
        "template":{"<>":"div","{}":function(){return(this.employee);},"html":"${name}"},
        "html":"<div>dorian</div>"
    },
    
    {
        "name":"{} Attribute (Inline Function Object - (obj))",
        "data":{"employee":{"name":"dorian"}},
        "template":{"<>":"div","{}":function(obj){return(obj.employee);},"html":"${name}"},
        "html":"<div>dorian</div>"
    },
    
    {
        "name":"{} Attribute (Inline Function Array - this)",
        "data":{"employees":[{"name":"dorian"},{"name":"monica"}]},
        "template":{"<>":"div","{}":function(){return(this.employees);},"html":"${name}"},
        "html":"<div>dorian</div><div>monica</div>"
    },
    
    {
        "name":"{} Attribute (Inline Function Array - (obj))",
        "data":{"employees":[{"name":"dorian"},{"name":"monica"}]},
        "template":{"<>":"div","{}":function(obj){return(obj.employees);},"html":"${name}"},
        "html":"<div>dorian</div><div>monica</div>"
    },
    
    {
        "name":"{} Attribute Embedded (Inline Function Array)",
        "data":{"employees":[{"name":"dorian"},{"name":"monica"}]},
        "template":{"<>":"ul","html":[
            {"<>":"li","{}":function(){return(this.employees);},"html":"${name}"}
        ]},
        "html":"<ul><li>dorian</li><li>monica</li></ul>"
    },
    
    {
        "name":"{} Attribute Embedded Children x2 (Inline Function Array)",
        "data":{"departments":[{"name":"catering","employees":["dorian","monica"]},{"name":"finance","employees":["monica"]}]},
        "template":{"<>":"ul","html":[
            {"<>":"li","{}":function(){return(this.departments);},"html":[
                {"<>":"h1","html":"${name}"},
            {"<>":"div","{}":function(){return(this.employees);},"html":[
                    {"<>":"span","html":"${value}"}
                ]}
            ]}
        ]},
        "html":"<ul><li><h1>catering</h1><div><span>dorian</span></div><div><span>monica</span></div></li><li><h1>finance</h1><div><span>monica</span></div></li></ul>"
    },
    
    {
        "name":"obj DEPRECATED Attribute (Inline Function Object - this)",
        "data":{"employee":{"name":"dorian"}},
        "template":{"<>":"div","{}":function(){return(this.employee);},"html":"${name}"},
        "html":"<div>dorian</div>"
    },
    
    //Void Elements
    {
        "name":"Void Element (area)",
        "data":{},
        "template":{"<>":"area","attr":"test","html":"not displayed"},
        "html":"<area attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (area)",
        "data":{},
        "template":{"<>":"area","attr":"test","html":"not displayed"},
        "html":"<area attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (base)",
        "data":{},
        "template":{"<>":"base","attr":"test","html":"not displayed"},
        "html":"<base attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (br)",
        "data":{},
        "template":{"<>":"br","attr":"test","html":"not displayed"},
        "html":"<br attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (col)",
        "data":{},
        "template":{"<>":"col","attr":"test","html":"not displayed"},
        "html":"<col attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (command)",
        "data":{},
        "template":{"<>":"command","attr":"test","html":"not displayed"},
        "html":"<command attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (embed)",
        "data":{},
        "template":{"<>":"embed","attr":"test","html":"not displayed"},
        "html":"<embed attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (hr)",
        "data":{},
        "template":{"<>":"hr","attr":"test","html":"not displayed"},
        "html":"<hr attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (img)",
        "data":{},
        "template":{"<>":"img","attr":"test","html":"not displayed"},
        "html":"<img attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (input)",
        "data":{},
        "template":{"<>":"input","attr":"test","html":"not displayed"},
        "html":"<input attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (keygen)",
        "data":{},
        "template":{"<>":"keygen","attr":"test","html":"not displayed"},
        "html":"<keygen attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (link)",
        "data":{},
        "template":{"<>":"link","attr":"test","html":"not displayed"},
        "html":"<link attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (meta)",
        "data":{},
        "template":{"<>":"meta","attr":"test","html":"not displayed"},
        "html":"<meta attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (param)",
        "data":{},
        "template":{"<>":"param","attr":"test","html":"not displayed"},
        "html":"<param attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (source)",
        "data":{},
        "template":{"<>":"source","attr":"test","html":"not displayed"},
        "html":"<source attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (track)",
        "data":{},
        "template":{"<>":"track","attr":"test","html":"not displayed"},
        "html":"<track attr=\"test\"/>"
    },
    
    {
        "name":"Void Element (wbr)",
        "data":{},
        "template":{"<>":"wbr","attr":"test","html":"not displayed"},
        "html":"<wbr attr=\"test\"/>"
    },
    
    //Undefined / Null
    {
        "name":"Special Values (undefined)",
        "data":{"val":undefined},
        "template":{"<>":"div","html":"${val}"},
        "html":"<div></div>"
    },
    
    {
        "name":"Special Values (null)",
        "data":{"val":null},
        "template":{"<>":"div","html":"${val}"},
        "html":"<div></div>"
    },
    
    //Components
    {
        "name":"Components [A] (Parent Data Array)",
        "components":{
            "A/item":{"<>":"div","html":"${name}"}
        },
        "data":[{"name":"dorian"},{"name":"monica"}],
        "template":{"[]":"A/item"},
        "html":"<div>dorian</div><div>monica</div>"
    },
    
    {
        "name":"Components [B] (Parent Sub Array)",
        "components":{
            "B/item":{"<>":"li","html":[
                {"<>":"span","html":"${name}"}
            ]}
        },
        "data":{"employees":[{"name":"dorian"},{"name":"monica"}]},
        "template":{"<>":"ul","html":[
            {"[]":"B/item","{}":function(o){return(o.employees);}}
        ]},
        "html":"<ul><li><span>dorian</span></li><li><span>monica</span></li></ul>"
    },
    
    {
        "name":"Components [C] (Block Wrapper)",
        "components":{
            "C/wrapper":{"<>":"section","html":[
	                {"html":function(obj,index,data,ihtml){return(ihtml);}}
	           ]}
        },
        "data":{"employee":{"name":"dorian"}},
        "template":{"[]":"C/wrapper","{}":function(){return(this.employee);},"html":[
                {"<>":"span","html":"${name}"}
            ]},
        "html":"<section><span>dorian</span></section>"
    },
    
    {
        "name":"Components [D] (Dynamic Component Name)",
        "components":{
            "D/name":{"<>":"span","html":"${name}"}
        },
        "data":{"component":"D/name","employee":{"name":"dorian"}},
        "template":{"[]":"${component}","{}":function(){return(this.employee);}},
        "html":"<span>dorian</span>"
    },
    
    {
        "name":"Components [E] (Undefined)",
        "components":{
            "E/item":{"<>":"div","html":"${name}"}
        },
        "data":undefined,
        "template":{"[]":"E/item"},
        "html":""
    },
    
    {
        "name":"Components [F] (obj undefined)",
        "components":{
            "F/name":{"<>":"span","html":"${name}"}
        },
        "data":{},
        "template":{"[]":"F/name","{}":function(){return}},
        "html":""
    },
    
    
]; 