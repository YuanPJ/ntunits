const express = require('express');
const bodyparser = require('body-parser');
const router = require('./api/route');
const mongoose = require('mongoose');
const server = express();

server.use(bodyparser.json());
server.use(express.static(__dirname+'/../public'))
server.use('/api', router);

// server.post('/cookie', (req,res) => {
//     res.cookie('login', {
//         login: req.body.login, 
//         id: req.body.id, 
//         name: req.body.name, 
//         picUrl: req.body.pictureUrl, 
//         friends: req.body.friends
//       }, 
//       { secure: true });
// })
// server.get('/cookie', (req,res) => {
//     if (typeof req.cookies === undefined) res.json({message: "login_again"});
//     else if (req.cookies.login === false) res.json({message: "login_again"});
//     else res.json({
//         message: "did_login",
//         login: req.cookies.login,
//         id: req.cookies.id,
//         name: req.cookies.name,
//         picUrl: req.cookies.picUrl,
//         friends: req.cookies.friends
//     })
// })

//====================================//
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ntunit');
console.log(`MONGODB_URI = ${process.env.MONGODB_URI}`);

const db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});
//====================================//

const port = process.env.PORT || 3002;
server.listen(port, ()=>{console.log(`listening on ${port}...`)});