//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var ROOT_DIR = "html/";
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
    if(err) throw err;
    db = database;
});

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    console.log("opening " + ROOT_DIR + urlObj.pathname);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(8080);