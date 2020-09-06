const express = require('express');
const multer = require("multer");
var sizeOf = require('image-size');
var fs = require('fs');
const sharp = require('sharp');
const router = express.Router();
const Post = require('../models/post');


const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpeg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/small");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post("", multer({ storage: storage }).array("images[]", 5), (req, res, next) => {
  let imagesData = [];
  let width =720;
  let height = 960;
  const url = req.protocol + '://' + req.get("host");
  req.files.forEach(item => {
    let path = `${item.destination}/${item.filename}`;
    let dimensions = sizeOf(path);
    if (dimensions['orientation'] == 1) {
      width = 960;
      height = 720;
    }
    sharp(item.path)
      .rotate()
      .resize(width, height)
      .jpeg({ quality: 80 })
      .toFile("backend/images/small/small_" + item.filename, function (err) {
        console.log('err', err);
      });

    let data;
    data = { path: (url + "/images/small/small_" + item.filename), width: width, height: height };
    imagesData.push(data);
  }
  );


  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    authorName: req.body.authorName,
    authorId: req.body.authorId,
    imageData: imagesData,
    tags: JSON.parse(req.body.tags),
    date: Date.now(),
    comments: []
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added",
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    })
  });
});



router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const currentTag = req.query.tag;
  let postQuery = Post.find();
  let filterQuery = Post.find();
  if (currentTag.length > 0) {
    postQuery = Post.find({
      tags: `${currentTag}`
    });
    filterQuery = Post.find({
      tags: `${currentTag}`
    });
  };

  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  };
  postQuery
    .then(documents => {
      fetchedPosts = documents;
     console.log('document', fetchedPosts);
      return filterQuery.count();
    })
    .then(count => {
      res.status(201).json({
        message: "Posts fetched",
        posts: fetchedPosts,
        maxPosts: count
      })
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  Post.findById(id, function (err, post) {
    if (err) throw err;
    const comment = { ...req.body, date: Date.now() };
    post.comments.push(comment);
    post.save().then(updatedPost => {
      const length = updatedPost.comments.length;
      res.status(201).json({
        message: "Post updated",
        comment: updatedPost.comments[length - 1],
        totalComments: length,
      })
    });
  });
})
module.exports = router;
