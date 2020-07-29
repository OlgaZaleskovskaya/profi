const express = require('express');
const multer = require("multer");
var sizeOf = require('image-size');
const router = express.Router();
const Post = require('../models/post');
const { getSyntheticLeadingComments } = require('typescript');

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
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


/* router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId,
    imagePath: url + "/images/" + req.file.filename,
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
}); */

router.post("", multer({ storage: storage }).array("images[]", 5), (req, res, next) => {
  let imagesData = [];
  const url = req.protocol + '://' + req.get("host");
  req.files.forEach(item => {
    let path = `${item.destination}/${item.filename}`;
    let dimensions = sizeOf(path);
    console.log("dimentions",  dimensions);
    let data;
/* if(dimensions.orientation == 6){
   data = {path: (url + "/images/" + item.filename), width: dimensions.height, height: dimensions.width};
} else {} */
   data = {path: (url + "/images/" + item.filename), width: dimensions.width, height: dimensions.height};


    imagesData.push(data);
    console.log('my data', imagesData );
  }
  );


  const post = new Post({
   title: req.body.title,
   content: req.body.content,
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
  // const testQuery = Post.find({ tags: 'family' });

  postQuery
    .then(documents => {
      fetchedPosts = documents;
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
