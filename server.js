const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// above all other handlers so don't even get public static files
// app.use ((req, res, next) => {
//   res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));

app.use ((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (request, response) => {
  // response.send('<h1>Hello Express</h1>');
  response.render('home.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Hello!!!'
  })
});

app.get('/about', (req, res) => {
  // res.send('about page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  // res.send('about page');
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'Hello!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'We don\'t serve this page!!!'
  });
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
