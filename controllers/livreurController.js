const Livreur = require("../models/livreur");

exports.getAll = (req, res) => {
  Livreur.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Livreur.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Livreur not found" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  Livreur.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  Livreur.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Livreur updated" });
  });
};

exports.delete = (req, res) => {
  Livreur.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Livreur deleted" });
  });
};
