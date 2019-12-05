
var express = require("express");
var router  = express.Router();
const problemSchema = require("../models/Comment_Schema");

router.route ('/'). get (function (req, res) { 
    problemSchema.find (function (err, posts) { 
        if (err) { 
            console.log (err); 
        } else { 
           res.json(posts) ; 
           //res.redirect("/");
        } 
    }); 
  
  });

router.route('/:id').get(function(req, res) {
  let id = req.params.id;
  problemSchema.findById(id, function(err, problemSchema) {
      res.json(problemSchema);
  });
});
router.route('/add').post(function(req, res) {
  let problemSchema = new problemSchema(req.body);
  problemSchema.save()
      .then(problemSchema => {
          res.status(200).json({'Comment': 'Comment added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new Comment failed');
      });
});
router.route('/update/:id').post(function(req, res) {
  problemSchema.findById(req.params.id, function(err, problemSchema) {
      if (!problemSchema)
          res.status(404).send("data is not found");
      else
          problemSchema.title = req.body.title;
          problemSchema.username = req.body.username;
          problemSchema.createdAt = req.body.createdAt;
          problemSchema.save().then(problemSchema => {
              console.log('Comment update!');
              res.json('Comment updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});

// router.route('/delete').post(function(req, res) {
//   problemSchema.findById(req.params.id, function(err, problemSchema) {
//       problemSchema._id = req.body._id;
//       problemSchema.remove().then(problemSchema => {
//           res.json('Comment delete!');
//       })
//       .catch(err => {
//           res.status(400).send("Update not e");
//       });
//   });
// });
router.route('/delete/:id').post(function(req, res) {
  problemSchema.findById(req.params.id, function(err, problemSchema) {
      if (!problemSchema)
          res.status(404).send("data is not found");
      else
          problemSchema.problemSchema_description = req.body.problemSchema_description;
          problemSchema.problemSchema_responsible = req.body.problemSchema_responsible;
          problemSchema.problemSchema_priority = req.body.problemSchema_priority;
          problemSchema.problemSchema_createdAt = req.body.problemSchema_createdAt;
          problemSchema.remove().then(problemSchema => {
              console.log('Comment delete!');
              //res.redirect("/");
          })
          .catch(err => {
              res.status(400).send("delete not possible");
          });
  });
});

