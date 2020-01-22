﻿var express = require("express");
const mongoose = require('mongoose');
// DB setting
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);     
mongoose.connect(process.env.MongoDB); 
const db = mongoose.connection;

var LoginRoute = express.Router();
// User DB 
var User     = require("../models/User");
var userInfo     = require("../models/userInfo");

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
  
  LoginRoute.post('/sign/overlap', function(req, res){
      var paramId = req.body.user_email;
      if(db) {
          overlapUser(db, paramId, function(err, docs) {             
              if(err) throw err;             
              if(docs) {
                  console.log('중복아이디 존재');
                  console.log(docs);   
                  //res.json(docs[0].user_email);
                  res.json('false');          
              } else {
                  // 결과가 없음. 로그인 실패
                  console.log('중복 아이디 없음.');
                  res.json('true');
                  //res.json(docs[0].user_email);
              }
          });
      } else {
          // db변수가 없음. db연결 오류
          console.log('DB변수 오류');
      }   
  });
  var overlapUser = function(db, id, callback){
      var users = db.collection('userinfos');
      // 이 userinfos에 연결된 모든 part를 불러옴
      users.find({'user_email':id}).toArray(function(err, docs){
          if(err) {callback(err, null); return;}
          if(docs.length>0){
              console.log('이메일 [%s]', id);
              callback(null,docs);
          }else{
              console.log('아이디 사용 가능');
              callback(null,null);
          }
      });
  }
    
  LoginRoute.route('/sign/add').post(function(req, res) {
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
  
module.exports = LoginRoute;