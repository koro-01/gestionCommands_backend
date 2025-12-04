const db = require("../config/db");

exports.getAll = (callback) => {
  db.query("SELECT * FROM preparateur", callback);
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM preparateur WHERE id = ?", [id], callback);
};

exports.create = (data, callback) => {
  db.query("INSERT INTO preparateur SET ?", data, callback);
};

exports.update = (id, data, callback) => {
  db.query("UPDATE preparateur SET ? WHERE id = ?", [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM preparateur WHERE id = ?", [id], callback);
};
