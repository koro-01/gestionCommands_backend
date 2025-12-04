const Preparateur = require("../models/preparateur");

exports.getAll = (req, res) => {
  Preparateur.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Preparateur.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Preparateur not found" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  Preparateur.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  Preparateur.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Preparateur updated" });
  });
};

exports.delete = (req, res) => {
  Preparateur.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Preparateur deleted" });
  });
};
