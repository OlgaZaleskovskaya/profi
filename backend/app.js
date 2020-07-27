const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const tagRoutes = require("./routes/tags");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/postcomments");
const path = require("path");

const app = express();
mongoose.connect("mongodb+srv://michael:vho5Z171bvvaADxv@cluster0-5szqr.mongodb.net/profi?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((res) => {
    console.log("Connected to database failed", res)
  })
//vho5Z171bvvaADxv



app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  };
  next();
});


app.use("/api/tags", tagRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/postcomments", commentRoutes);
module.exports = app;

