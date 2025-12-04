const db = require("../config/db");

exports.getAll = (callback) => {
  // return full commande rows (avoid referencing columns that may not exist in joined tables)
  db.query(`SELECT c.* FROM commande c`, callback);
};

exports.getById = (id, callback) => {
  db.query(`SELECT c.* FROM commande c WHERE c.id = ?`, [id], callback);
};

exports.create = (data, callback) => {
  db.query("INSERT INTO commande SET ?", data, callback);
};

exports.update = (id, data, callback) => {
  db.query("UPDATE commande SET ? WHERE id = ?", [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM commande WHERE id = ?", [id], callback);
};
