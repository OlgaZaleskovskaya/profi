const express = require('express');
const router = express.Router();
const Tag = require('../models/tags');

router.post("", (req, res, next) => {
let tags = [];
req.body.subCategories.forEach(tag => {
  const tagObj = { name: tag};
  tags.push(tagObj);
});
  const tag = new Tag({
    name: req.body.category,
    tags: tags,
  });
  tag.save();
  res.status(201).json({
    message: "Category added",
    category: tag
  })
});

router.get("", (req, res, next) => {
  Tag.find()
    .then(tags => {
      res.status(201).json({
        message: "Categories fetchead",
        tags: tags
      })
    });
});

router.delete("/:id", (req, res, next) => {
  Tag.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: "Tag deleted"
      })
    })
});

router.put("/:id", (req, res, next) => {
  const updatedTag = new Tag({
    _id: req.body.id,
    name: req.body.category,
    tags: req.body.subcategories
  })
  Tag.updateOne({ _id: req.params.id }, updatedTag)
    .then(result => {
      res.status(200).json({
        message: "Tag updated"
      })
    })
});

module.exports = router;
