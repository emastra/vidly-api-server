const Joi = require('joi');
const mongoose = require('mongoose');

// hybrid approach!! check first videos in this section!!!

const Rental = mongoose.model('Rental', new mongoose.Schema({
  // we use a custom schema. here we are not reusing the customer schema that we defined. Because cust can have many props
  // we only need the primary props to display list of rentals. only the essentials
  // if in the future we need to display more info about the cust on rental page, we have the customer id, so we could send get request for customer api to get the complete representation
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
    // we are going to use this to calculate rental fee.
    // Including this in an embedded document, we wont need an additional query to movie collection to calculate renatl fee.
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
}));

function validateRental(rental) {
  // schema is so different from the mongoose schema
  // only two props. these are the props the clint sends to the server
  // we dont want the client to set dateout prop or datereturned or rental fee. client must send pnly these two value
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
