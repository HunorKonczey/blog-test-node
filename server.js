const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });

  greet();
  greet();
  greet();
  res.setHeader('Content-Type', 'text/html');

  let path = './views/';
  res.statusCode = 200;

  switch (req.url) {
    case '/':
      path += 'index.html';
      break;
    case '/about':
      path += 'about.html';
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  //read html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
    }

    res.end();
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening on 3000 port');
});
