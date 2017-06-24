import User from './dbModel';

module.exports = {
    postUser(req, res){
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        User.findOneAndUpdate({userID: req.body.userID}, req.body, options)
    },
    getUser(req, res){
        const id = req.params.postID;
        User.findById(id, (err,post) => {
            if (err) console.log(err);
            res.json(post);
            console.log(`getPost ${id}: ${post}`)
        })   
    },
    putAnswer(req, res){
        const id = req.params.postID;
        User.findByIdAndUpdate(id,{answer: req.body})
            .catch(err => console.log(err));
        // res.json({state: "SUCCESS"});
    },
    getAnswer(req, res){

    }
}
