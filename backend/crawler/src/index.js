const express = require('express')
const app = express()
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

const port = 3000;

// connect to db
db.connect();

app.use(morgan('combined'));
app.use(
  express.urlencoded({
      extended: true,
  }),
); 

app.use(express.json()); // xử lí dữu liệu js lên

// template engine
app.engine(
  'hbs',
  handlebars({
      extname: '.hbs',
      
  }),
); 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.use(morgan('combined')); // hiện thi giao tiếp giao diện và máy chủ trên cmd

app.listen(port, () => {
  console.log(`Crawler listening at http://localhost:${port}`)
})