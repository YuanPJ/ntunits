const User = require('./dbModel');
// console.log(User)

module.exports = {
  postUser(req, res) {
    // console.log('in the postUser')
    // const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // User.findOneAndUpdate({ userID: req.body.userID }, req.body, options);
    User.count({userID: req.body.userID},(err,count) => {
      if (count === 0){
        console.log('create new user')
        // const array = [3,0,0,0,0,0,0,0,0,0,0,0,0]
        User.create({
          userID: req.body.userID,
          userName: req.body.userName,
          userPicURI: req.body.userPicURI,
          friendList: req.body.friendList,
          // answer: array
        })
      }
    })

    console.log('postUser in server', req.body)
    User.find({}, (err, user)=> console.log(user))
  },
  getUser(req, res) {
    const id = req.params.id;
    User.findOne({userID: id}, (err, user) => {
      if (err) console.log(err);
      res.json(user);
      console.log(`getPost ${id}: ${user}`);
    });
  },
  putAnswer(req, res) {
    const id = req.params.id;
    let array = []
    User.findOne({userID: id}, (err, user)=> {
      array = Array.from(user.answer);
      console.log('original answer array', array)
      array[req.body.question] = req.body.answer
      console.log('new answer array', array)
      User.findOneAndUpdate({userID: id}, { answer: array })
          .catch(err => console.log(err));
    })

        // res.json({state: "SUCCESS"});
  },
  getAnswer(req, res) {
    const id = req.params.id;
    let all = [];
    User.find({}, { answer: 1, _id: 0 }, (err, data) => {
      console.log('get answer',data);
      console.log(typeof data);
      all = data.map(x => x.answer[id])
      console.log(all)
      res.json({ answer: all });
    });
    // console.log('get answer', all);
    // const array = all.map(x => x.answer[id]);
  },
};
