const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}));

function validateMovie(movie) {
  // this is the joi schema
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    // here we dont have genre, but only genreId because i want the user to send only id
    // this infact is INPUT validation (what the user sends us). then the mongoose schema can be larger than this. Infact the mongoose schema for genre is a complex object
    // the mongoose schema instead is the representation of our model in our app, its the persistence model, waht we are going to store in our mongodb 
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
