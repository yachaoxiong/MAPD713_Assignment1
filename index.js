var SERVER_NAME = 'Yachao_Assignment_1';
var PORT = 5000;
var HOST = '127.0.0.1';

var restify = require('restify')

  // Get a persistence engine for the users
  , imagesSave = require('save')('images')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())