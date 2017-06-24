import apiFunc from './api';
import quiz from '../QuizSet';
import router from express.Router();

router.post('/user', apiFunc.postUser);
router.get('/user/:id', apiFunc.getUser);
router.put('/user/:id', apiFunc.putAnswer);
router.get('/quiz', (req, res) => res.json(quiz));
router.get('/answer/:id', apiFunc.getAnswer);

module.exports = router
