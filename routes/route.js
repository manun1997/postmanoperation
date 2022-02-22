var router = require("express").Router();
const cors = require("cors");
const mysqli = require("mysql");
const bookdata = require("../controller/controller");

module.exports = (app) => {
  router.post("/", bookdata.create);
  // router.get("/", bookdata.findAll);
  // router.get("/published", bookdata.findAllPublished);
  // router.get("/:id", bookdata.findOne);
  // router.put("/:id", bookdata.update);
  // router.delete("/:id", bookdata.delete);
  // router.delete("/", bookdata.deleteAll);
  app.use("/api/books", router);
};
