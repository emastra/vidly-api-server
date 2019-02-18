const {User} = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    // initialize the user obj, need it because
    // generateAuthToken use it to create the payload of the token
    // need to generate a valid objectid too otherwise mongo is going to ignore that
    // also need toHexString because when decoded it'll be a string. and to use the below toMatchObject with req.user (that is the decoded payload) i need to have it as a string here
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const token = new User(user).generateAuthToken();
    // mock the following 3 objects!
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
