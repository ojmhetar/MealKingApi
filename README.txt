How to use the Meal King API. 
Created by Two Beards and Fro. 


Revised: 12/26/2014
Author: Ojas Mhetar


This API returns JSON objects and still requires much work.

To access the api, use this link: 
https://polar-hollows-5436.herokuapp.com/api

To GET all the recipies in the database use: 
/api/recpie 

To GET a single recipie (it has to be in the database!): 
/api/recpie/(name) 
e.g /api/recpie/Pizza
case sensitive!

To ADD (POST) recipies:
(temp solution) 
https://www.hurl.it/
Use the appropriate parameters: 

name: String,
minutes: Number,
image: String,
favorites: Number,
failure: Number,
ingredients: Array,
steps: Array,
comments: Array


