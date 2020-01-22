
const express = require("express");
const problemRoutes = express.Router();
// 문제 요청 리스트 DB
var Todo     = require("../models/Todo");

// req 요청 입장 들어보기,,,,
problemRoutes.route ('/'). get (function (req, res) { 
  Todo.find (function (err, todos) { 
      if (err) { 
          console.log (err); 
      } else { 
         res.json(todos) ; 
         console.log("problem/ router");
         //res.redirect("/");
      } 
  }); 
});

problemRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
      res.json(todo);
  });
});
problemRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body);
  todo.save()
      .then(todo => {
          res.status(200).json({'Comment': 'Comment added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new Comment failed');
      });
});
problemRoutes.route('/edit/:id').post(function(req, res) {
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

problemRoutes.route('/delete/:id').post(function(req, res) {
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

module.exports = problemRoutes;