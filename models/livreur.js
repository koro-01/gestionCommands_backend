const db = require("../config/db");

exports.getAll = (callback) => {
  db.query("SELECT * FROM livreur", callback);
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM livreur WHERE id = ?", [id], callback);
};

exports.create = (data, callback) => {
  db.query("INSERT INTO livreur SET ?", data, callback);
};


exports.update = (id, data, callback) => {
  db.query("UPDATE livreur SET ? WHERE id = ?", [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM livreur WHERE id = ?", [id], callback);
};
