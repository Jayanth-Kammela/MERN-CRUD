var express = require('express');
var path = require('path');
var cors = require('cors')
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todoRoute')
var app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouter)
// app.get('/usertodo',midAuth,getUserProduct)



let mongoose = require('mongoose');

mongoose.set('strictQuery', true);


async function main() {
   mongoose.connect(process.env.MONGO_URI);
   console.log('db connected');
}
main().catch(err => console.log(err));



module.exports = app;
