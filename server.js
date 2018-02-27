const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getFullYear', ()=> {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIT', (text)=> {
  return text.toUpperCase()
});

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=> {
  var now =  new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log('Unable to append server.log');
    }
  });
  next();
});
app.get('/',(req,res)=> {
    res.render('home.hbs', {
      pageTitle: 'Home Page',
      wellcomeMessage: 'WelCome To My Website'
    });
});

app.get('/about', (req,res) => {
  // res.send('<p>About Page</p>');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to connect'
  });
});

app.listen(3000, ()=> {
  console.log('Server run on port 3000');
});
