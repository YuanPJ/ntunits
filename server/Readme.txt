===== DATABASE =====

data structure (UserSchema):
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
    url: '/api/user'
    method: post
    function: post user全部資料，傳全0 answer array上去 (put 更新 answer array)
    request body: 整個要更新的UserSchema
getUser:
    url: '/api/user/:id'
    method: get
    function: get全部資料
    return: 整個user資料
getQuiz:
    url: '/api/'
    method: get
    function: 從server get quiz[id] 題目與選項
    return: 所有問題與選項，參照./QuizSet.js
putAnswer: 
    url: '/api/'
    method: put
    function: 更新user answer answer[id]
    request body:
    return: 
getAnswer:
    url: '/api/'
    method: get
    function: chart要拿問題結果，傳某題answer column array
    return: 