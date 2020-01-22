const express = require("express");
const yearRoutes = express.Router();
// 년도별 문제 리스트 DB
var Problem     = require("../models/Problem");

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