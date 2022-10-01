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


   // Get all images in the system
 server.get('/images', function (req, res, next) {
  
  console.log("Images GET : Received request to get all images"); 
  // Find every entity within the given collection
  imagesSave.find({}, function (error, images) {

    // Return all of the users in the system
    console.log("Images GET : Returning all images");
    res.send(images)
  })
})


// Create a new image
server.post('/images', function (req, res, next) {
  

  console.log("images POST: Received request to create a new image");

  // Make sure name is defined
  if (req.body.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.body.url === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('url must be supplied'))
  }


  if (req.body.size === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('size must be supplied'))
  }

  const newImage = {
    name: req.body.name,
    url: req.body.url,
    size: req.body.size,
	}

  // Create the user using the persistence engine
  imagesSave.create( newImage , function (error, image) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
   
    console.log("images POST: Created new image with name " + image.name);
    // Send the user if no issues
    res.send(201, image)
  })
})


// Delete all images
server.del('/images', function (req, res, next) {
  
  console.log("images DELETE: Received request to delete all images");
  // Delete all images with the persistence engine
  imagesSave.deleteMany({}, function (error, images) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
    console.log("images DELETE: Deleted all images");
    // Send a 200 OK response
    res.send(200,"All images deleted")
  })
})