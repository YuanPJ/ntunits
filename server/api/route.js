const apiFunc = require('./api');
const quiz = require('../QuizSet');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/../public/index.html`);
});
router.post('/user', () => apiFunc.postuser);
router.get('/user/:id', () => apiFunc.getUser);
router.put('/user/:id', () => apiFunc.putAnswer);
router.get('/quiz', (req, res) => res.json(quiz));
router.get('/answer/:id', () => apiFunc.getAnswer);

module.exports = router;
