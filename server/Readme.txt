===== DATABASE =====

data structure:
{
    userID: string
    userName: string
    userPicURI: string
    friendList: [
        ??????
    ]
    answer: [
        int
    ]
}

===== API =====

postUser: 
    method: post (put)
    function: post user全部資料，傳全0 answer array上去 (put 更新 answer array)
getUser:
    method: get
    function: get全部資料
getQuiz/:id :
    method: get
    function: 從server get quiz[id] 題目與選項
putAnswer/:id : 
    method: put
    function: 更新user answer answer[id]
getAnswer:
    method: get
    function: chart要拿問題結果，傳某題answer column array
