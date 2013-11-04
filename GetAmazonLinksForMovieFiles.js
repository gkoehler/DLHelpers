var jsdom = require('jsdom');


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  //process.stdout.write("\n" + 'got some data data: ' + chunk);
  // split it by newlines:
  var lines = chunk.split("\n");
  for (var i = lines.length - 1; i >= 0; i--) {
  	// each line has a title. But it might need some cleaning.
  	var title = lines[i];
  	var removeExtensionRegEx = /.*[\..*$]/g; // tested with http://www.gethifi.com/tools/regex
  	// test if this has a file extension. if so, remove it:
  	if(removeExtensionRegEx.test(lines[i]))
  		title = lines[i].match(removeExtensionRegEx)[0];
  	// replace some characters with spaces:
  	title = title.replace(/[\._]/g," ");
  	// remove anything in parenthesis:
  	title = title.replace(/\(.*\)/g,"");
  	// send it off:
  	getFirstResult(title, function(movie) {
  		console.log(movie.title + "\t" + movie.link);
  	});
  };
});


var getFirstResult = function(title, callback) {

	var url = 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dmovies-tv&field-keywords='
	 + encodeURIComponent(title);

	jsdom.env({
	    url: url,
	    scripts: ['http://code.jquery.com/jquery.js'],
	    done: (function (errors, window) {
	        var $ = window.$;

	        var firstResult = $('#result_0');

	        if(firstResult.length > 0) {
		        callback({
		        	title: $('a.title', firstResult).text(),
		        	link: $('a.title', firstResult).attr('href')
		        });
		    } 

	    })
	});
};
