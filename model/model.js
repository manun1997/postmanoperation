const con = require("../config/config");
// constructor
const data = function (data) {
  this.title = data.title;
  this.description = data.description;
  this.published = data.published;
};

data.create = (dataoperation, result) => {
  con.query("INSERT INTO books SET ?", dataoperation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Books: ", { id: res.insertId, ...dataoperation });
    result(null, { id: res.insertId, ...dataoperation });
  });
};

// data.findById = (id, result) => {
//   con.query(`SELECT * FROM books WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (res.length) {
//       console.log("found Books: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// data.getAll = (title, result) => {
//   let query = "SELECT * FROM books";
//   if (title) {
//     query += ` WHERE title LIKE '%${title}%'`;
//   }
//   con.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// data.getAllPublished = (result) => {
//   con.query("SELECT * FROM books WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("Books: ", res);
//     result(null, res);
//   });
// };

// data.updateById = (id, data1, result) => {
//   con.query(
//     "UPDATE books SET title = ?, description = ?, published = ? WHERE id = ?",
//     [data1.title, data1.description, data1.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("updated Books: ", { id: id, ...data1 });
//       result(null, { id: id, ...data1 });
//     }
//   );
// };

// data.remove = (id, result) => {
//   con.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     console.log("deleted Book with id: ", id);
//     result(null, res);
//   });
// };

// data.removeAll = (result) => {
//   con.query("DELETE FROM books", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} books`);
//     result(null, res);
//   });
// };

module.exports = data;
