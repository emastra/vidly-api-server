/*

We need our server. so we exported from index.js and import it here
first time we run integration test the server will be started and listening on port 3000. when we run again tests server would be still running and the port would be busy, so it'd fail
so when writing integration tests we should start the server before and stop it after each test

*/

const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => {
    server.close();
    // clean up the db every each function/test
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      const genres = [
        { name: 'genre1' },
        { name: 'genre2' },
      ];

      await Genre.collection.insertMany(genres);

      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      // typical prob when integration tests with models
      // toMatchObject is gonna fail because we expect an objectId instead we reveive a string
      // when we store the genre mongoose sets the _id to an objectId but when we read the id it will be a string
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      // without this we receive a 500 if not validateObjectId middleware in the route
      // and 404 because not passing the validateObjectId middleware because mongoose cannot cast value 1 as an object id
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/genres/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {

    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let token;
    let name;
    
    // can i avoid this await/async? return immediately, so i return a promise and then await later?
    const exec = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    }

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    })

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      name = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await exec();

      const genre = await Genre.find({ name: 'genre1' });

      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });

  describe('PUT /:id', () => {
    let genre;
    beforeEach(async () => {
      genre = new Genre({name: 'genre1'});
      genre = await genre.save();
    });

    it('should return 401 if not logged in', async () => {
      // const id = mongoose.Types.ObjectId();
      const res = await request(server)
        .put('/api/genres/' + genre._id)
        .send();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      // const id = mongoose.Types.ObjectId();
      const token = new User().generateAuthToken();
      const name = '1234';
      const res = await request(server)
        .put('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send({ name });

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      // const id = mongoose.Types.ObjectId();
      const token = new User().generateAuthToken();
      const name = new Array(52).join('a');
      const res = await request(server)
        .put('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send({ name });

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is invalid', async () => {
      // const id = mongoose.Types.ObjectId() + 1;
      const token = new User().generateAuthToken();
      const name = '12345';
      const res = await request(server)
        .put('/api/genres/' + '1')
        .set('x-auth-token', token)
        .send({ name });

      expect(res.status).toBe(404);
    });

    it('should return 404 if id is not found', async () => {
      // const id = mongoose.Types.ObjectId() + 1;
      const token = new User().generateAuthToken();
      const name = '12345';
      const res = await request(server)
        .put('/api/genres/' + genre._id + 1)
        .set('x-auth-token', token)
        .send({ name });

      expect(res.status).toBe(404);
    });

    it('should return the genre if it is valid', async () => {
      const id = mongoose.Types.ObjectId();
      const token = new User().generateAuthToken();
      const name = '12345';
      const res = await request(server)
        .put('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send({ name });
        console.log(res.body);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', '12345');
    });
  });

  describe('DELETE /:id', () => {
    let genre;
    beforeEach(async () => {
      genre = new Genre({name: 'genre1'});
      genre = await genre.save();
    });

    it('should return 401 if not logged in', async () => {
      const res = await request(server)
        .delete('/api/genres/' + genre._id)
        .send();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user not admin', async () => {
      const token = new User({ isAdmin: false }).generateAuthToken();
      const res = await request(server)
        .delete('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send();

      expect(res.status).toBe(403);
    });

    it('should return 404 if id is invalid', async () => {
      const token = new User({ isAdmin: true }).generateAuthToken();
      const res = await request(server)
        .delete('/api/genres/' + 1)
        .set('x-auth-token', token)
        .send();

      expect(res.status).toBe(404);
    });

    it('should return 404 if id is not found', async () => {
      const token = new User({ isAdmin: true }).generateAuthToken();
      const res = await request(server)
        .delete('/api/genres/' + genre._id + 1)
        .set('x-auth-token', token)
        .send();

      expect(res.status).toBe(404);
    });

    it('should return genre if id is found', async () => {
      const token = new User({ isAdmin: true }).generateAuthToken();
      const res = await request(server)
        .delete('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send();

        expect(res.body).toHaveProperty('_id', genre._id.toHexString());
        expect(res.body).toHaveProperty('name', 'genre1');
    });

    it('should be null if it is removed', async () => {
      const token = new User({ isAdmin: true }).generateAuthToken();
      const res = await request(server)
        .delete('/api/genres/' + genre._id)
        .set('x-auth-token', token)
        .send();

      const returnedGenre = await Genre.findById(genre._id);

      expect(returnedGenre).toBeNull();
    });

  });

});
