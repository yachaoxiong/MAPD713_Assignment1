var SERVER_NAME = 'Yachao_Assignment_1';
var PORT = 5000;
var HOST = '127.0.0.1';
var colors = require('colors');
var getCount = 0;
var postCount = 0;

var restify = require('restify')

  // Get a persistence engine for the users
  , imagesSave = require('save')('images')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

server.listen(PORT, HOST, function () {

    console.log('***************************************'.yellow)
    console.log('server name: '.green, server.name.cyan);
    console.log('Server listening at: '.green, server.url.cyan)
    console.log('Endpoints: '.green, (server.url + '/images').underline.blue + ' ' +'Methods: GET POST DELETE'.magenta)
    console.log('***************************************'.yellow)
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())


   // Get all images in the system
 server.get('/images', function (req, res, next) {
   getCount++;
   console.log("\n")
  console.log("processed Request Count -->" + "GET: " + getCount.toString().blue + " POST: " + postCount.toString().blue);
  console.log("Images GET :" + " Received request to get all images".green); 
  // Find every entity within the given collection
  imagesSave.find({}, function (error, images) {

    // Return all of the users in the system
    console.log("Images GET :" + " Returning all images".green);
    console.log("\n")
    res.send(images);
  })
})


// Create a new image
server.post('/images', function (req, res, next) {
  postCount++;
  console.log("\n")
  console.log("processed Request Count -->" + "GET: " + getCount.toString().blue + " POST: " + postCount.toString().blue);
  console.log("images POST: " + "Received request to create a new image".green);

  // Make sure all the required fields are present
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
   
    console.log("images POST: Created new image with name ".green + image.name.cyan);
    console.log("\n")
    // Send the user if no issues
    res.send(201, image)
  })
})


// Delete all images
server.del('/images', function (req, res, next) {
  console.log("\n")
  console.log("images DELETE: " + "Received request to delete all images".red);
  // Delete all images with the persistence engine
  imagesSave.deleteMany({}, function (error, images) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
    console.log("images DELETE: " + "Deleted all images".green);
    console.log("\n")
    // Send a 200 OK response
    res.send(200,"All images deleted")
  })
})