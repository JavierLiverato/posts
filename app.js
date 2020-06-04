const auth = require('./routes/auth');
const posts = require('./routes/posts');
const users = require('./routes/users');

const configDB = require('./config/database.js');

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

var app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '100mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);

mongoose.connect(configDB.url, { server: { auto_reconnect: true } }, (err, db) => {
    err ? console.log("connection " + err.message + "") : console.log("success DB connection")
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('Ruta no encontrada')
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err)

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send('Error')
});

module.exports = app;
