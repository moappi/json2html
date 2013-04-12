var movies = [
    { "Name": "The Pink Violin", "ReleaseYear": "2008" },
    { "Name": "The Red Violin", "ReleaseYear": "1998" },
    { "Name": "The blue Violin", "ReleaseYear": "1988" },
    { "Name": "The yellow Violin", "ReleaseYear": "1978" },
    { "Name": "The purple Violin", "ReleaseYear": "1968" },
    { "Name": "The orange Violin", "ReleaseYear": "1958" }
];
var movieisnew = {
    'tag': 'div',
    'style': 'color:#ff0000;background:#aaffaa;',
    'html': '${Name} (${ReleaseYear})'
};
var movieisold = {
    'tag': 'input/',
	'type':'text',
    'style': 'color:#aaaa00;background:#ffffaa;',
    'value': '${Name} (${ReleaseYear})'
};
var transform = {
    'children': function () {
        if (this.ReleaseYear > 1980) {
            return json2html.transform(this, movieisnew);
        } else {
            return json2html.transform(this, movieisold);
        }
    }
};

var html = json2html.transform(movies, transform);

document.write('<h1>Empty and closed tag support</h1>'+html);