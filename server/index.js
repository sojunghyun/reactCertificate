
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// login 및 passport, session관리 패키지
// var methodOverride = require("method-override");
// var flash     = require("connect-flash");
// var session    = require("express-session");
// var passport   = require("./config/passport"); // 1

var User     = require("../models/User");
var userInfo     = require("../models/userInfo");

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
const LoginRoute = express.Router();
const HomeRoute = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// // Passport // 2
// app.use(passport.initialize());
// app.use(passport.session()); 

// // Custom Middlewares // 3
// app.use(function(req,res,next){
//  res.locals.isAuthenticated = req.isAuthenticated();
//  res.locals.currentUser = req.user;
//  next();
// })

app.use('/view/', require("../routes/routeHomeview")); // home 문제 랜덤 리스트 뿌려주는 라우터
app.use("/Problem/", require("../routes/routeProblem"));
app.use('/comment/', require("../routes/routeYear")); // 3번째 뷰의 년도별 문제 리스트 라우터
app.use('/login/', LoginRoute); // Login 후 View 화면
app.use('/home/', HomeRoute); // Login 후 View 화면

//app.use('api/account/', require("../routes/account")); 



LoginRoute.route('/naverInCallback').get(function(req, res) {
  let user = new User(req.body);
  user.save()
      .then(user => {
          res.status(200).json({'Comment': 'Comment added successfully'});
          console.log(res);
      })
      .catch(err => {
          res.status(400).send('adding new Comment failed');
      });
});


// LoginRoute.route('/user').post(function(req, res) {
//   let user = new User(req.body);
//   user.save()
//       .then(user => {
//           res.status(200).json({'Comment': 'Comment added successfully'});
//           console.log(res);
//       })
//       .catch(err => {
//           res.status(400).send('adding new Comment failed');
//       });
// });

// LoginRoute.route('/add').post(function(req, res) {
//   let user = new User(req.body);
//   user.save()
//       .then(user => {
//           res.status(200).json('login success!');
//           console.log(res);
//       })
//       .catch(err => {
//           res.status(400).send('adding new Comment failed');
//       });
// });
// router function
// req 요청 입장 들어보기,,,,
LoginRoute.route ('/auth'). get (function (req, res) { 
    userInfo.find (function (err, userinfos) { 
        if (err) { 
            console.log (err); 
        } else { 
           res.json(userinfos) ; 
           //res.redirect("/");
        } 
    }); 
  });

LoginRoute.post('/user', function(req, res){
     
    var paramId = req.body.user_email;
    var paramPassword = req.body.user_password;
     
    if(db) {
        authUser(db, paramId, paramPassword, function(err, docs) {             
            if(err) throw err;
             
            if(docs) {
                console.log('로그인 성공');
                console.log(docs);   
                // res.json(docs[0].user_email);
                res.json(docs[0].user_email);
          
            } else {
                // 결과가 없음. 로그인 실패
                console.log('로그인 실패');
                res.json('false');
            }
        });
    } else {
        // db변수가 없음. db연결 오류
        console.log('DB변수 오류');
    }   
});

var authUser = function(db, id, password, callback){
    console.log('authIser 호출 : '+id+password);
    var users = db.collection('userinfos');
    // 이 userinfos에 연결된 모든 part를 불러옴
    users.find({'user_email':id, 'user_password':password}).toArray(function(err, docs){
        if(err) {callback(err, null); return;}
        if(docs.length>0){
            console.log('이메일 [%s], 비밀번호 [%s]', id, password);
            callback(null,docs);
        }else{
            console.log('일치하는 사용자 없음');
            callback(null,null);
        }
    });
}
// LoginRoute.route('/user').post(function(req, res) {
//     var paramId = req.body.user_email;
//     var paramPassword = req.body.password;

//     userInfo.find( { "user_email": { $eq: res.user_email} }, function(err, user){
//         if(!user) res.status(404).send('data is not fount');
//         else console.log('data found');
//         user.user_email = req.body.user_email;
//         user.user_email.find()
//         console.log(user.user_email);
//     } )
//   });
//   LoginRoute.route('/user').get(function(req, res) {
//     let id = req.params.id;
//     userInfo.findById(id, function(err, user) {
//         res.json(user);
//         console.log(user);
//     });
//   });
  
  LoginRoute.route('/add').post(function(req, res) {
    let user = new userInfo(req.body);
    user.save()
        .then(user => {
            res.status(200).json('회원가입 success!');
            console.log(res);
        })
        .catch(err => {
            res.status(400).send('adding new 회원가입 failed');
        });
  });


// Port setting
const port = 7376;
app.listen(7376, function(){
  console.log("server on! http://localhost:"+port);
});
