const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

//connect to mongoDB
const dbURI =
  'mongodb+srv://hunika:4OHTZXUSpQaKZUBx@cluster0.joeeq.mongodb.net/node-test?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
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
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use(authRoutes);
app.use('/blogs', blogRoutes);

//cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('isEnabled', true), { maxAge: 1000 * 60 * 60 * 24 };
  res.send('you got cookies');
});

app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
});

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
});
