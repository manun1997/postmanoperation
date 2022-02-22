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

var coroptions = { orign: "http://localhost:4000" };

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

let refreshtoken = [];
app.post("/token", (req, res) => {
  const refreshtoken = req.body.token;

  // id = req.body.lastid;
  // console.log(id);
  // con.query(
  //   "SELECT * FROM tokensstore WHERE id=?",
  //   [id],
  //   function (err, result, fields) {
  //     if (err) throw err;
  //     const user_name = result.token;
  //     console.log(user_name);

  if (refreshtoken == null) return res.sendStatus(401);
  if (!refreshtoken.includes(refreshtoken)) return res.sendStatus(403);
  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const access_token = generateaccesstoken({ name: user.name });
    res.json({ access_token: access_token });
  });
});

app.post("/login", (req, res) => {
  username = req.body.username;

  const user = { name: username };

  var title = req.body.title;
  var token = req.body.token;

  const access_token = generateaccesstoken(user);
  const refreshtoken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ access_token: access_token, refreshtoken: refreshtoken });
  refreshtoken.push(refreshtoken);
  //   const userdata2 = req.body;
  //   con.query("INSERT INTO tokensstore SET ?", [userdata2], (err, result) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log("record inserted");
  //     }
  //   });

  // var sql =
  //   "INSERT INTO tokensstore (id, username, title, token) VALUES ('', '" +
  //   username +
  //   "', '" +
  //   title +
  //   "', '" +
  //   refreshtoken +
  //   "')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   res.render("/token", { lastid: result.insertId });
  //   console.log(lastid);
  // });
  //Createing TokenS For Authentication
});

//authenticatrion Middle ware to verify
function generateaccesstoken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}.`);
});

// Create Middlewares
