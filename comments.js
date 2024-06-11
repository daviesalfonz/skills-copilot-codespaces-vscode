// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url);
  var path = parsedUrl.pathname;
  var query = querystring.parse(parsedUrl.query);
  if (path === '/comments' && req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var comment = querystring.parse(body);
      comments.push(comment);
      console.log(comments);
      res.end('Success');
    });
  } else if (path === '/comments' && req.method === 'GET') {
    res.end(JSON.stringify(comments));
  } else {
    fs.readFile(__dirname + path, function(err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      }
      res.end(data);
    });
  }
});

server.listen(3000);