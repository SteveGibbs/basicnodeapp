var http = require('http');
var app = require('./app');

//var fs = require('fs');

//var module1 = require('./module1');
//var module2 = require('./module2');


//function onRequest(request, response) {
  //  response.writeHead(200, {'Content-Type': 'text/html'});
    //fs.readFile('./index.html', null, function(error, data) {
      //  if (error) {
        //    response.writeHead(404);
          //  response.write('Sorry file not found!');
        //} else {
          //  response.write(data);
       // }
        //response.end();
    //});

    //response.write("Hello World!" + module1.myString);
   // module1.myFunction();
   // module2.myFunction();
   // response.end();
//}

http.createServer(app.handleRequest).listen(8000);