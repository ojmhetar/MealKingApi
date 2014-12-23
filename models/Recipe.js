var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var RecipeSchema = new Schema({
	name: String, 
	minutes: Number, 
	image: String, 
	favorites: Number, 
	failure: Number, 
	ingredients: Array, 
	steps: Array, 
	comments: Array
});

module.exports = mongoose.model('Recipe', RecipeSchema); 
 
