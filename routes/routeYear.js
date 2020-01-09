
const express = require("express");
var Problem     = require("../models/Problem");
const yearRoutes = express.Router();

yearRoutes.route ('/2018'). get (function (req, res) { 
    Problem.find(function(err, problems){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(problems);
  })
  });
  yearRoutes.route('/2018/:id').get(function(req, res) {
    let id = req.params.id;
    Problem.findById(id, function(err, problem) {
        res.json(problem);
    });
  });

module.exports = yearRoutes;