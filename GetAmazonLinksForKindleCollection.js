var jsdom = require('jsdom');
var fs = require("fs");


var run = function(args) {

  // user has specified list of pages in args
  var filenames = args.file.split(',');

  filenames.forEach(function(filename) {
    var filedata = fs.readFile(filename, function(err, data){
      parseKindleReadingListPage(data,function(results){
        // callback is called when we have a list of book titles & authors
        // we will be called several times if there are several pages of books
        // search the main store for each one, and log the first result URL to the console:
        for (var i = 0; i < results.length; i++) {
          book = results[i];
          getFirstResult(book.title, 'digital-text', function(book) {
            console.log(book.title + "\t" + book.link);
          });
        };
      },function(err){
        //console.log(err);
      })
    });
  });

}

var parseKindleReadingListPage = function(html, callback, errorcallback) {
  jsdom.env({
    html:html,
    scripts: ['http://code.jquery.com/jquery.js'],
    done: (function (errors, window) {
        var $ = window.$;

        if($('.titleAndAuthor a').length == 0) {
          errorcallback && errorcallback('No kindle books found.')
        }

        callback($('.titleAndAuthor a').map(function(){ 
          return {
            title: $(this).text(), 
            link:$(this).attr('href')
          }; 
        }));
    })
  })
};


var getFirstResult = function(title, type, callback) {

  var url = 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3D' 
  + encodeURIComponent(type)
   + '&field-keywords='
   + encodeURIComponent(title);

	jsdom.env({
	    url: url,
	    scripts: ['http://code.jquery.com/jquery.js'],
	    done: (function (errors, window) {
	        var $ = window.$;

	        var firstResult = $('#result_0 h3');

	        if(firstResult.length > 0) {
            var book = {
		        	title: $('a', firstResult).text(),
		        	link: $('a', firstResult).attr('href')
		        }
            callback(book);
		    } 

	    })
	});
};


// very simple way to normalize arguments, just like a regular JS function would receive
// so, this:
//    script.js -arg1=argval -arg2=newargval -arg3
// would translate to:
//    {arg1:argval, arg2:newargval, arg3:undefined}
// (there are also other parameters Node adds)
// If the same argument is used twice with different values, 
// their values are comma-delimited.
// so, this:
//    script.js -file=filename1.txt -file=filename2.txt
// would translate to:
//    {file:'filename1.txt,filename2.txt'}
// see: https://gist.github.com/gkoehler/7296205
var args = {};
process.argv.forEach(function(arg) {
  if (args[arg.match(/[\w\.]+/g)[0]] == null)
    args[arg.match(/[\w\.]+/g)[0]] = arg.match(/[\w\.]+/g)[1];
  else {
    args[arg.match(/[\w\.]+/g)[0]] += ',' + arg.match(/[\w\.]+/g)[1];
  }
});

//console.log(args);
run(args); // here is where you run your main function



