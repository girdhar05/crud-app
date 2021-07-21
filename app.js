// npm packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// local packages
const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');

const app = express();
mongoose.connect('mongodb://localhost:27017/crudTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log(err);
    })

// To configure the View
app.set('view engine', 'ejs');
app.set('views', 'views');


// middlewares
// express body-parser
app.use(express.urlencoded({extended: false}));
// public static file to be redered as middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/', studentRouter);

// app listening on PORT 3000
app.listen(3000, () => {
    console.log('server listen on PORT 3000');
});