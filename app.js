const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000

require('dotenv').config()
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use(express.static("images"));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/restaurantRoutes');
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 5000. Ctrl^c to quit.');
})