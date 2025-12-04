const Product = require("../models/product");

exports.getAll = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  Product.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
};

exports.delete = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
};
