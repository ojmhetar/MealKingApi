// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var Recpie =  require('./models/Recpie.js');
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
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://iamking:kingo@ds035260.mongolab.com:35260/mealking');


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
router.route('/recpie')

	.post(function(req, res){
		var recpie = new Recpie();
		recpie.name = req.body.name;
		recpie.minutes = req.body.minutes; 
		recpie.image = req.body.image; 
		recpie.failure = req.body.failure; 
		recpie.favorites = req.body.favorites; 
		recpie.steps = req.body.steps; 
		recpie.ingredients = req.body.ingredients; 
		recpie.comments = req.body.comments; 


		recpie.save(function(err){
			if(err)
				res.send(err);

			res.json({ message: 'Recpie Added!' });
		});
	})
	.get(function(req, res) {
		Recpie.find(function(err, recpies) {
			if (err)
				res.send(err);

			res.json(recpies);
		});
});

router.route('/recpie/:recpie_id')
	.get(function(req, res) {
		Recpie.findById(req.params.recpie_id, function(err, recpie) {
			if (err)
				res.send(err);
			res.json(recpie);
		});
	})
	.put(function(req, res) {
		Recpie.findById(req.params.recpie_id, function(err, recpie) {
			if (err)
				res.send(err);
			recpie.name = req.body.name; 

			recpie.save(function(err) {
				if (err)
					res.send(err);

				res.json({message: 'Recpie updated.'});
			});
		});

	})
	.delete(function(req, res) {
		Recpie.remove({
			_id: req.params.recpie_id
		}, function(err, recpie) {
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
