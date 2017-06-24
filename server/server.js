const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyparser.json());

//=============================//
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
 
// const Schema = mongoose.Schema;
// const PostSchema = new Schema({
//     title: String,
//     content: String,
//     time: String
// })

// const Post = mongoose.model('post', PostSchema);

//=============================//

const Quizset = [
    {
        question: "ㄅㄐ是什麼？",
        options: [
            "醜男",
            "會長",
            "阿海",
            "天鈞的表哥",
            "變態"
        ]
    }
]