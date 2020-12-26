/* 
Entry file for the API. 
*/

// Dependencies
var http = require('http'); 
var https = require('https');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config')
var fs = require('fs');

var httpServer = http.createServer(function(req, res){
    unifiedServer(req, res)
})

httpServer.listen(config.httpPort, function(){
    console.log('The server is listening on port ', config.httpPort)
})

httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res)
})

httpsServer.listen(config.httpsPort, function(){
    console.log('The server is listening on port ', config.httpsPort)
})


var unifiedServer = function(req, res) {
    var parsedUrl = url.parse(req.url, true); // true -> parse the query string with the query string module
    
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, ''); // resolves /path/ to /path

    var queryStringObject = parsedUrl.query;

    var headersObject = req.headers;


    // bind to event 'data' from the req object, call this callback
    var decoder = new stringDecoder('utf-8'); 
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data)
    });


    req.on('end', function() {
        buffer += decoder.end();

        // now that the request has been read and ended

        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': req.method,
            'headers': headersObject,
            'payload': buffer,
        }

        chosenHandler(data, function(statusCode, payload){
            // use defaults 
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            var responsePayload = JSON.stringify(payload);
            
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(responsePayload);

            console.log('Returning the response ', statusCode, responsePayload)
        })



    })
}


var handlers = {

}


handlers.sample = function(data, callback) {
    // callback an http status code and a payload object
    callback(406, {'name': 'sample'});

}

handlers.notFound = function(data, callback) {
    callback(404);
}
// define a request router. 

var router = {
    'sample': handlers.sample
}
