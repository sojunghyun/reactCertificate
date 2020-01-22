const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// DB setting
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);     
mongoose.connect(process.env.MongoDB); 
const db = mongoose.connection;
db.once("open", function(){  console.log("DB connected");});
db.on("error", function(err){  console.log("DB ERROR : ", err);});

// Other settings
//app.set("view engine", "ejs");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 

// 소스코드 수정 후 npm run-script build > node ./index.js 시작
console.log(path.resolve(__dirname,'../build'));
app.use('/', express.static(path.resolve(__dirname,'../build')));

//Router
//라우터 설정 에러 문제 problem url 이후의 router 설정이기 때문에 /Problem/ 으로 나타내야함.
const HomeRoute = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/view/', require("../routes/routeHomeview")); // home 문제 랜덤 리스트 뿌려주는 라우터
app.use("/Problem/", require("../routes/routeProblem"));
app.use('/comment/', require("../routes/routeYear")); // 3번째 뷰의 년도별 문제 리스트 라우터
app.use('/login/', require("../routes/routeLogin")); // Login 후 View 화면
app.use('/home/', HomeRoute); // Login 후 View 화면

//app.use('api/account/', require("../routes/account")); 


// Port setting
const port = 7376;
app.listen(7376, function(){
  console.log("server on! http://localhost:"+port);
});
