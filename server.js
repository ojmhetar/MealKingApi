/* The Meal King API 
 * Two Beards and Fro 
 */

//Packages used
var express    = require('express'); 		
var app        = express(); 				
var path 	   = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

//Schema desired for data base
var Recipe =  require('./models/Recipe.js');

//App settings, include views into path, and use ejs as templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express Router, Read 4.0 documentation or above only!
var port = process.env.PORT || 3000; 		
var router = express.Router(); 

//Makes all the routes prefixed with /api
app.use('/api', router);

//The database connection 
//mongoose.connect('mongodb://iamking:kingo@ds035260.mongolab.com:35260/mealking');
mongoose.connect('127.0.0.1:27017/test'); 

//Default page 
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Meal King API. By Two Beards and Fro!' });	
});

//Page to add recipes with a "nicer UI"
app.get('/addrecipe', function(req, res) {
	res.render('recipeadd'); 
}); 

//The actual API here 

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Request sent.');
	next(); // make sure we go to the next routes and don't stop here
});

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
		Recipe.find(function(err, recipe) {
			if (err)
				res.send(err);

			res.json(recipe);
		});
});

router.route('/recipe/:recipe_id')
	.get(function(req, res) {
		Recipe.findOne({'name': req.params.recipe_id }, function(err, recipe) {
			if (err)
				res.send(err);
			res.json(recipe);
		});
	})
	.put(function(req, res) {
		Recipe.findOne({'name': req.params.recipe_id}, function(err, recipe) {
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


app.listen(port);
console.log('The MEAL KING API is running on port ' + port);
