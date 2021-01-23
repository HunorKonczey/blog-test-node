const User = require('../models/user');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  //handle duplicate error code
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
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
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = (req, res) => {};

module.exports = {
  signup_get,
  login_get,
  logout_get,
  signup_post,
  login_post,
};
