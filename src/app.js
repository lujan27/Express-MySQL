const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const methodoverride = require('method-override');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended: false}));

app.use(logger('dev'));

app.use(methodoverride('_method'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

//Connection
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 8080,
    database: 'Person'
}, 'single'));

app.use(require('./routes/index'));

app.listen(port, () => {
    console.log('Server on port: ', port);
})