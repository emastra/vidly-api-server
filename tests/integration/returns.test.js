const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const mongoose = require('mongoose');

/*

// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// Return 400 if rental already processed
// Return 200 if valid request
// Set the return date
// Calculate the rental fee (numberOfDays * movie.dailyRentalRate)
// Increase the stock
// Return the rental

// let server;
// let rental;
// let customerId;
// let movieId;

*/

describe('/api/returns', () => {
  let server;
  let rental;
  let movie;
  let customerId;
  let movieId;

  beforeEach(async () => {
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    server = require('../../index');

    movie = new Movie({
      _id: movieId,
      title: 12345,
      genre: {name: 12345},
      numberInStock: 10,
      dailyRentalRate: 2
    });
    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345'
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2
      }
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  //

  describe('POST /', () => {
    it('should work!', async () => {
      const res = await Rental.findById(rental._id);

      expect(res).not.toBeNull();
    });

    it('should return 401 if client is not logged in', async () => {
      const res = await request(server).post('/api/returns').send({customerId, movieId});

      expect(res.status).toBe(401);
    });

    it('return 400 if customerId is not provided', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({movieId});

      expect(res.status).toBe(400);
    });

    it('return 400 if movieId is not provided', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId});

      expect(res.status).toBe(400);
    });

    it('return 404 if no rental found for this customer/movie', async () => {
      const token = new User().generateAuthToken();
      // modify the movieId
      movieId = mongoose.Types.ObjectId();
      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      expect(res.status).toBe(404);
    });

    it('should return 400 if rental already processed', async () => {
      const token = new User().generateAuthToken();
      rental.dateReturned = Date.now();
      await rental.save();

      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      expect(res.status).toBe(400);
    });

    it('should return 200 if request is valid', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      expect(res.status).toBe(200);
    });

    it('should set the return date if request is valid', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      let rentalInDB = await Rental.findById(rental._id);

      let diff = new Date() - rentalInDB.dateReturned;

      expect(diff).toBeLessThan(10 * 1000);
      expect(res.status).toBe(200);
    });

    it('should set the rental fee to correct amount', async () => {
      const token = new User().generateAuthToken();
      rental.dateOut = new Date(new Date()) - (86400000 * 7);

      await rental.save();

      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      let rentalInDB = await Rental.findById(rental._id);

      expect(rentalInDB.rentalFee).toBe(14);
    });

    it('should increase the stock if request valid', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      let movieinDB = await Movie.findById(movieId);

      expect(movieinDB.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return the rental in response body', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server).post('/api/returns').set('x-auth-token', token).send({customerId, movieId});

      const rentalInDB = await Rental.findById(rental._id);

      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie']));
    });

  // END //
  });




// END //
});
