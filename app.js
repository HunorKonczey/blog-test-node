const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//connect to mongoDB
const dbURI =
  'mongodb+srv://hunika:4OHTZXUSpQaKZUBx@cluster0.joeeq.mongodb.net/node-test?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

//register view engine
app.set('view engine', 'ejs');

//middleware
/*
app.use((req, res, next) => {
  console.log('new request maade:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});
*/

app.use(express.static('public'));
app.use(morgan('tiny'));

//routes
app.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      const blogs = result;
      res.render('index', { title: 'Home', blogs });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs', (req, res) => {
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create blog' });
});

//redirects

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
});
