const express = require('express');
const RestaurantModel = require('../models/Restaurant')
const app = express();

//get ALL restaurant details
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
  const restaurants = await RestaurantModel.find({});

  try {
    console.log(restaurants[0].name) 
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
  
});

//get by CUISINE
//***this is the one thats showing up in terminal not postman for some reason***
//http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:cuisine', async (req, res) =>{
  const type = req.params.cuisine
  const restaurants = await RestaurantModel.find({cuisine : type})

  try {
    console.log(restaurants) 
    res.send(restaurants)
  } catch (err) {
    res.status(500).send(err);
  }

})

//restaurant_id in ASC or DESC
//http://localhost:3000/restaurants?sortBy=ASC
app.get('/restaurants', async (req, res) => {
  const sort = req.query.sortBy
  const restaurants = await RestaurantModel.find({}).select("id cuisine name city restaurant_id").sort({'_id' : sort})

  try {
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
})

//read where all cuisines are EQUAL to Delicatessen AND city is NOT EQUAL to Brooklyn
//http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res)=>{
  const sort = req.query.sortBy
  const restaurants = await RestaurantModel.find({ cuisine: 'Delicatessen', city: { $ne: "Brooklyn"} })
  .select("cuisine name city -_id")
  .sort({"name" : sort})
      
  try {
    res.send(restaurants)
  } catch(err) {
    res.status(500).send(err)
  }
})

module.exports = app


