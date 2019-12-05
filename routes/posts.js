// routes/posts.js

var express = require("express");
var router  = express.Router();
var Post    = require("../models/Comment_Schema");

// Index 
router.get("/", function(req, res){
  Post.find({})                  // 1
  .sort("-createdAt")            // 1
  .exec(function(err, posts){    // 1
    if(err) return res.json(err);
    res.render("/comment/", {posts:posts});
  });
});

// New
router.get("/add", function(req, res){
  res.render("/comment/");
});

// create
router.post("/", function(req, res){
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/comment/");
  });
});

// show
router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("/comment/show", {post:post});
  });
});

// edit
router.get("/edit/:id", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("/comment/edit", {post:post});
  });
});

// update
router.put("/:id", function(req, res){
  req.body.updatedAt = Date.now(); // 2
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/comment/"+req.params.id);
  });
});

// destroy
router.delete("/delete/:id", function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/comment");
  });
});

module.exports = router;