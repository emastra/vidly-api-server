const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  // we need a transaction here. we have two separate operations, but if one fails the other needs to roll back
  // they are atomic. they both complete or they both roll back!!
  try {
    new Fawn.Task()
      // params: mongod collection name (plural and case sensitive), new rental object
      .save('rentals', rental)
      // params: collection, query, update object (with update operator $inc)
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      // finally call run to perform operations
      .run();

    // it's mongoose (through the mongodb driver ) that sets the id and dateout we received back here. before saving to db.
    res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router;
