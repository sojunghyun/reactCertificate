// import express from 'express';
// import app from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const os = require("os");


var Todo     = require("../models/Todo");

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.connect(process.env.MongoDB); // 2
const db = mongoose.connection; // 3
// 4
db.once("open", function(){
  console.log("DB connected");
});
// 5
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});
// Other settings
//app.set("view engine", "ejs");
app.use('/', express.static(path.resolve(__dirname,'../build')));

app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// 소스코드 수정 후 npm run-script build > node ./index.js 시작
// console.log(path.resolve(__dirname,'../build'));
// app.use('/', express.static(path.resolve(__dirname,'../build')));
// app.use('/Problem/', require("../routes/posts"));
app.use("/comment/", require("../routes/posts-router"));
const todoRoutes = express.Router();
app.use('/Problem/', todoRoutes);
//Router
//라우터 설정 에러 문제 problem url 이후의 router 설정이기 때문에 /Problem/ 으로 나타내야함.
// const Routes = express.Router();
// app.use('/Problem/', todoRoutes);


// app.post('/Problem', (req, res) => {
//   var newMessage = new Message(req.body);
//   newMessage.save((err, doc) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });
// const Schema = mongoose.Schema;

// const Problemchema = new Schema({
//   name:{type:String}
// });
// var Contact = mongoose.model("contacts", Problemchema); //5


// DB schema // 4
// var Problemchema = mongoose.Schema({
//   name:{type:String, required:true, unique:true}
// });


// Routes
// Home // 6
// app.get('/Problem/', function(req, res){
//   res.redirect('/Problem');
// });
// app.get('/Problem/', function(req, res){
//   res.redirect('http://localhost:7376/Problem/');
// });
// app.use('/Problem/', (req, res, next)=> {
//   res.redirect('http://localhost:7376/Problem/');
// })




// // Problem - Index // 7
// app.get("/Problem", function(req, res, next){
//   Contact.find({}, function(err, contacts){
//     if(err) return res.json(err);
//     res.render("/Problem", {contacts:contacts});
//   });
// });

// app.get("/Problem/user", function(req, res, next){
//   res.send({username:os.userInfo().username});
// });


// Port setting
const port = 7376;
app.listen(7376, function(){
  console.log("server on! http://localhost:"+port);
});
