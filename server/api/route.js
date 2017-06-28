const apiFunc = require('./api');
const quiz = require('../QuizSet');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/../public/index.html`);
});
router.post('/user', () => { apiFunc.postUser; console.log('POST USER')});
router.get('/user/:id', () => { apiFunc.getUser; console.log('GET USER')});
router.put('/user/:id', () => { apiFunc.putAnswer; console.log('PUT USER')});
router.get('/quiz', (req, res) => { res.json(quiz); console.log('GET QUIZ')});
router.get('/answer/:id', () => { apiFunc.getAnswer; console.log('GET ANSWER')});

module.exports = router;
