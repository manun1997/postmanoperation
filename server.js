require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ssplit = require("split");
const app = express();
const mysqli = require("mysql");
const con = require("./config/config");
const routes = require("./routes/route");
const jwt = require("jsonwebtoken");
const model = require("./model/model");

var coroptions = { orign: "http://localhost:8081" };

app.use(cors(coroptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const posts = [
  {
    username: "Manu",
    title: "Data 1",
  },
  {
    username: "Manoj",
    title: "Data 2",
  },
];
app.get("/posts", authenticationtoken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  username = req.body.username;
  const user = { name: username };

  //Createing TokenS For Authentication
  const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ access_token: access_token });
});

//authenticatrion Middle ware to verify
function authenticationtoken(req, res, next) {
  // authentication comes from Bearer TOKEN Bearer ->authder Token ->token auth.split for space between that

  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];

  // we need to just the token wheater is access token is orrect or not

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" },
    (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    }
  );
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}.`);
});

// Create Middlewares
