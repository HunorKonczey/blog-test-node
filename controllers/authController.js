const User = require('../models/user');

//blog: index, details, create_get, create_post, delete
const signup_get = (req, res) => {
  res.render('auth/signup', { title: 'Signup' });
};

const login_get = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

const logout_get = (req, res) => {};

const signup_post = (req, res) => {};

const login_post = (req, res) => {};

module.exports = {
  signup_get,
  login_get,
  logout_get,
  signup_post,
  login_post,
};
