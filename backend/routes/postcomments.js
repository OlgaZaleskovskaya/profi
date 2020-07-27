const express = require('express');
const multer = require("multer");
const router = express.Router();
const Postcomment = require('../models/postcomment');


router.post("", (req, res, next) => {
  console.log('post comment ');
  const url = req.protocol + '://' + req.get("host");
  console.log('post comment url', url);

  const postcomment = new Postcomment({
    postId: req.body.postId,
    comments:[ {authorId: req.body.authorId, content: req.body.content, data: Date.now()}]
  });

  console.log('postcomment url', postcomment);
  postcomment.save().then(createdComment => {
    res.status(201).json({
      message: "Post added",
      comment: {
        ...createdComment,
        id: createdComment._id,
      }
    })
  });
});


router.put("", (req, res, next) => {
  console.log('post comment ');
  const url = req.protocol + '://' + req.get("host");
  console.log('post comment url', url);

  const postcomment = new Postcomment({
    postId: req.body.postId,
    comments:[ {authorId: req.body.authorId, content: req.body.content, data: Date.now()}]
  });

  console.log('postcomment url', postcomment);
  postcomment.save().then(createdComment => {
    res.status(201).json({
      message: "Post added",
      comment: {
        ...createdComment,
        id: createdComment._id,
      }
    })
  });
});


module.exports = router;
