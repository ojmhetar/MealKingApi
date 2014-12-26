// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var Recipe =  require('./models/Recipe.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Meal King API. By Two Beards and Fro!' });	
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://iamking:kingo@ds035260.mongolab.com:35260/mealking');
//mongoose.connect('127.0.0.1:27017/test'); 

var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Request sent.');
	next(); // make sure we go to the next routes and don't stop here
});

router.route('/home')
	.get(function(req, res) {
		 res.render('opener', { title: 'The index page!' })
	});

// more routes for our API will happen here
router.route('/recipe')

	.post(function(req, res){
		var recipe = new Recipe();
		recipe.name = req.body.name;
		recipe.minutes = req.body.minutes; 
		recipe.image = req.body.image; 
		recipe.failure = req.body.failure; 
		recipe.favorites = req.body.favorites; 
		recipe.steps = req.body.steps; 
		recipe.ingredients = req.body.ingredients; 
		recipe.comments = req.body.comments; 


		recipe.save(function(err){
			if(err)
				res.send(err);

			res.json({ message: 'Recipe Added!' });
		});
	})
	.get(function(req, res) {
		Recipe.find(function(err, recipes) {
			if (err)
				res.send(err);

			res.json(recipes);
		});
});

router.route('/recipe/:recipe_id')
	.get(function(req, res) {
		Recipe.findById(req.params.recipe_id, function(err, recipe) {
			if (err)
				res.send(err);
			res.json(recipe);
		});
	})
	.put(function(req, res) {
		Recipe.findById(req.params.recipe_id, function(err, recipe) {
			if (err)
				res.send(err);
			recipe.name = req.body.name; 

			recipe.save(function(err) {
				if (err)
					res.send(err);

				res.json({message: 'Recipe updated.'});
			});
		});

	})
	.delete(function(req, res) {
		Recipe.remove({
			_id: req.params.recipe_id
		}, function(err, recipe) {
			if (err)
				res.send(err);

			res.json({message: 'Successfully deleted'});
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Activated on port ' + port);
