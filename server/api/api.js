import User from './dbModel';
import '../Quizset';

const data = [
    {
        question: "ㄅㄐ是什麼？",
        options: [
            "醜男",
            "會長",
            "阿海",
            "天鈞的表哥",
            "變態"
        ]
    },
    {
        question: "台大最大系？",
        options: [
            "醫學",
            "管院各系",
            "電機",
            "文學院",
            "工學院"
        ]
    }
]


  postUser(req, res){
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        User.findOneAndUpdate({userID: req.body.userID}, req.body, options)
    },
    getUser(req, res){
        const id = req.params.id;
        User.findById(id, (err,post) => {
            if (err) console.log(err);
            res.json(post);
            console.log(`getPost ${id}: ${post}`)
        })   
    },
    putAnswer(req, res){
        const id = req.params.id;
        User.findByIdAndUpdate(id,{answer: req.body})
            .catch(err => console.log(err));
        // res.json({state: "SUCCESS"});
    },
    getAnswer(req, res){
        const id = req.params.id
        const all = User.find({}, {answer: 1, _id: 0})
        const array = all.map(x => {x.answer[id]})
        res.json({answer: array})
    },
    getQuiz(req, res){
        console.log("get quiz");
        res.json(data);
    }
}
