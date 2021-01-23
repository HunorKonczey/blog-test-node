const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  //handle duplicate error code
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
  }

  //incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'That email is not registered';
  }

  //incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'That password is not registered';
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const jwtExpire = 10 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret keyyy', {
    expiresIn: jwtExpire,
  });
};

//blog: index, details, create_get, create_post, delete
const signup_get = (req, res) => {
  res.render('auth/signup', { title: 'Signup' });
};

const login_get = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

const logout_get = (req, res) => {};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: jwtExpire * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: jwtExpire * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  signup_get,
  login_get,
  logout_get,
  signup_post,
  login_post,
};
