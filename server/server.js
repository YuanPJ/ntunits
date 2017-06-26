const express = require('express');
const bodyparser = require('body-parser');
const api = require('./api/api')

const server = express();

server.use(bodyparser.json());
server.use('/api',api)

//====================================//
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog');
console.log(`MONGODB_URI = ${process.env.MONGODB_URI}`)

const db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});
//====================================//

const port = process.env.PORT || 3001;
app.listen(port, ()=>{console.log(`listening on ${port}...`)});