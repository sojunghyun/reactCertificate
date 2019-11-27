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
app.set("view engine", "ejs");
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// 소스코드 수정 후 npm run-script build > node ./index.js 시작
console.log(path.resolve(__dirname,'../build'));
app.use('/', express.static(path.resolve(__dirname,'../build')));
// app.use('/Problem', express.static(path.resolve(__dirname,'../build')));
// app.use('/home', express.static(path.resolve(__dirname,'../build')));

//Router
//라우터 설정 에러 문제 problem url 이후의 router 설정이기 때문에 /Problem/ 으로 나타내야함.
const todoRoutes = express.Router();
app.use ('/Problem/', todoRoutes);

todoRoutes.route ('/'). get (function (req, res) { 
  Todo.find (function (err, todos) { 
      if (err) { 
          console.log (err); 
      } else { 
          res.json(todos) ; 
      } 
  }); 
});
todoRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
      res.json(todo);
  });
});
todoRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body);
  todo.save()
      .then(todo => {
          res.status(200).json({'todo': 'todo added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new todo failed');
      });
});
todoRoutes.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
      if (!todo)
          res.status(404).send("data is not found");
      else
          todo.todo_description = req.body.todo_description;
          todo.todo_responsible = req.body.todo_responsible;
          todo.todo_priority = req.body.todo_priority;
          todo.todo_completed = req.body.todo_completed;
          todo.save().then(todo => {
              res.json('Todo updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});


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
app.get("/", function(req, res){
  res.redirect("/Problem");
});


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
// // Problem - New // 8
// // app.get("/Problem/new", function(req, res){
// //   res.render("Problems/new");
// // });
// // Problem - create // 9
// app.post("/Problem", function(req, res){
//   Contact.create(req.body, function(err, contact){
//     if(err) return res.json(err);
//     res.redirect("/Problem");
//   });
// });

// Port setting
const port = 7376;
app.listen(7376, function(){
  console.log("server on! http://localhost:"+port);
});
