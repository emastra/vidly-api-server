const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const Joi = require('joi');
// const validate = require('../middleware/validate');

// POST a return
router.post('/', auth, async (req, res) => {
  const { error } = validateReturn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) return res.status(404).send('No rental found.');

  if(rental.dateReturned)
    return res.status(400).send('Cannot complete operation, your return is already processed.');

  ////// At this point request is valid

  rental.return();
  await rental.save();

  await Movie.update({_id: rental.movie._id}, {$inc: {numberInStock: 1}});

  res.send(rental);
});

const validateReturn = (obj) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(obj, schema);
};

module.exports = router;
