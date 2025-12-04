const db = require("../config/db");

exports.getAll = (callback) => {
  db.query("SELECT * FROM produit", callback);
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM produit WHERE id = ?", [id], callback);
};

exports.create = (data, callback) => {
  db.query("INSERT INTO produit SET ?", data, callback);
};

exports.update = (id, data, callback) => {
  db.query("UPDATE produit SET ? WHERE id = ?", [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM produit WHERE id = ?", [id], callback);
};
