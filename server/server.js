const express = require('express');
const bodyparser = require('body-parser');
const router = require('./api/route')
const mongoose = require('mongoose');
const server = express();

server.use(bodyparser.json());
server.use(express.static(__dirname+'/public'))
server.use('/api',router)

//====================================//
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog');
console.log(`MONGODB_URI = ${process.env.MONGODB_URI}`)
console.log('final project')
const db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});
//====================================//

const port = process.env.PORT || 3001;
server.listen(port, ()=>{console.log(`listening on ${port}...`)});