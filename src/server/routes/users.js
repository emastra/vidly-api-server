const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middleware/auth');

// GET full current user by id
router.get('/me', auth, async (req, res) => {
  // req.user, after successfull auth, has the decoded obj. which contains only _id
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// signup
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  // hash and overwrite pw
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // so the user is directly logged in
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
