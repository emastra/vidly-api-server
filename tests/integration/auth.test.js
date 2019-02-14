const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');
const request = require('supertest');

describe('auth middleware', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => {
    // if i dont clean up with this line, re-running the 'GET /' test would fail because
    // in the happy path here we create a genre in the db. so then the docuemnts would be more than 2.
    await Genre.remove({});
    server.close();
  });

  let token;

  // no use of async/await. it returns the returned Promise. ANd then we await later.
  // it'd be needed if we wanted to use the res for some more calculations and then return some other value!
  const exec = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' });
  }

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  // on the happy path we should also test that decoded is set to req.user. But supertest dont access the req obj so we'll write a unit test for this. 
});
