
const express = require("express");
const HomeListRoutes = express.Router();
var Problem     = require("../models/Problem");

HomeListRoutes.route ('/'). get (function (req, res) { 
    Problem.find(function(err, problems){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(problems);
  })
  });
HomeListRoutes.route('/:id').get(function(req, res) {
let id = req.params.id;
Problem.findById(id, function(err, problem) {
    res.json(problem);
});
});

module.exports = HomeListRoutes;