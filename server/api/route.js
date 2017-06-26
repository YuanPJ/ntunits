const apiFunc = require('./api');
const quiz = require('../QuizSet');
const express = require('express')
const router = express.Router()

router.post('/user', apiFunc.postUser);
router.get('/user/:id', apiFunc.getUser);
router.put('/user/:id', apiFunc.putAnswer);
router.get('/quiz', (req, res) => res.json(quiz));
router.get('/answer/:id', apiFunc.getAnswer);

module.exports = router;
