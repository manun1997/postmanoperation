const express = require("express");
const app = express();
const cors = require("cors");
const mysqli = require("mysql");
const datamodel = require("../model/model");

exports.create = (req, res) => {};

// exports.findAll = (req, res) => {};

// exports.findOne = (req, res) => {};

// exports.findAllPublished = (req, res) => {};

// exports.update = (req, res) => {};

// exports.delete = (req, res) => {};

// exports.deleteAll = (req, res) => {};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const booksdata = new booksdata({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  booksdata.create(booksdata, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};
