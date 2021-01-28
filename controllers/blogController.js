const Blog = require('../models/blog');

const handleErrors = (err) => {
  let errors = { title: '', snippet: '', body: '' };

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//blog: index, details, create_get, create_post, delete
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      const blogs = result;
      res.render('blogs/index', { title: 'Home', blogs });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { blog: result, title: 'Blog details' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' });
};

const blog_create_post = async (req, res) => {
  try {
    const { title, snippet, body } = req.body;
    var blog = await Blog.create({
      title: title,
      snippet: snippet,
      body: body,
      userId: req.userId,
    });
    res.status(201).json({ result });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
