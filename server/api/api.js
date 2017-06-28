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
        User.create({
          userID: req.body.userID,
          userName: req.body.userName,
          userPicURI: req.body.userPicURI,
          friendList: req.body.friendList
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
    User.findOneAndUpdate({userID: id}, { answer: req.body })
        .catch(err => console.log(err));
        // res.json({state: "SUCCESS"});
  },
  getAnswer(req, res) {
    const id = req.params.id;
    const all = User.find({}, { answer: 1, _id: 0 });
    const array = all.map(x => x.answer[id]);
    res.json({ answer: array });
  },
};
