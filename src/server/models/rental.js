const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

// hybrid approach!!
const rentalSchema = new mongoose.Schema({
  // custom schema for customer and movie. not reusing the customer schema previously defined. Because cust can have many props
  // need only the primary props to display list of rentals.
  // if in the future i need to display more info about the cust on rental page, i have the customer id, so i could send get request for customer api to get the complete representation
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },
  movie: {
    // same here
    // going to use this to calculate rental fee.
    // Including this in an embedded document, no need an additional query to movie collection to calculate renatl fee.
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

rentalSchema.statics.lookup = function(customerId, movieId) {
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId,
  });
}

rentalSchema.methods.return = function() {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  // only two props. these are the props the clint sends to the server
  // client cant set dateout, datereturned or rental fee props. client must send only these two value
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
