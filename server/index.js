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
var Commentschema = require("../models/Comment_Schema");

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
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// 소스코드 수정 후 npm run-script build > node ./index.js 시작
console.log(path.resolve(__dirname,'../build'));
app.use('/', express.static(path.resolve(__dirname,'../build')));


//Router
//라우터 설정 에러 문제 problem url 이후의 router 설정이기 때문에 /Problem/ 으로 나타내야함.
const todoRoutes = express.Router();
const comentRoutes = express.Router();
app.use('/comment/', comentRoutes);
app.use('/Problem/', todoRoutes);

todoRoutes.route ('/'). get (function (req, res) { 
  Todo.find (function (err, todos) { 
      if (err) { 
          console.log (err); 
      } else { 
         res.json(todos) ; 
         //res.redirect("/");
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
          res.status(200).json({'Comment': 'Comment added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new Comment failed');
      });
});
todoRoutes.route('/edit/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
      if (!todo)
          res.status(404).send("data is not found");
      else
          todo.todo_description = req.body.todo_description;
          todo.todo_responsible = req.body.todo_responsible;
          todo.todo_priority = req.body.todo_priority;
          todo.todo_createdAt = req.body.todo_createdAt;
          todo.save().then(todo => {
              console.log('Comment update!');
              res.json('Comment updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});

todoRoutes.route('/delete/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
      if (!todo)
          res.status(404).send("data is not found");
      else
          todo.todo_description = req.body.todo_description;
          todo.todo_responsible = req.body.todo_responsible;
          todo.todo_priority = req.body.todo_priority;
          todo.todo_createdAt = req.body.todo_createdAt;
          todo.remove().then(todo => {
              console.log('Comment delete!');
              res.redirect("/");
          })
          .catch(err => {
              res.status(400).send("delete not possible");
          });
  });
});



comentRoutes.route ('/'). get (function (req, res) { 
  Commentschema.find (function (err, comments) { 
        if (err) { 
            console.log (err); 
        } else { 
           res.json(comments) ; 
           //res.redirect("/");
        } 
    }); 
  
  });

comentRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Commentschema.findById(id, function(err, comments) {
      res.json(comments);
  });
});
comentRoutes.route('/add').post(function(req, res) {
  let comment = new Commentschema(req.body);
  comment.save()
      .then(problem => {
          res.status(200).json({'Comment': 'Comment added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new Comment failed');
      });
});
comentRoutes.route('/delete/:id').post(function(req, res) {
  Commentschema.findById(req.params.id, function(err, comment) {
      if (!comment)
          res.status(404).send("data is not found");
      else
            comment.title = req.body.title;
            comment.username = req.body.username;
            comment.todo_createdAt = req.body.todo_createdAt;
            comment.remove().then(todo => {
              console.log('Comment delete!');
              res.redirect("/");
          })
          .catch(err => {
              res.status(400).send("delete not possible");
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


// Port setting
const port = 7376;
app.listen(7376, function(){
  console.log("server on! http://localhost:"+port);
});
