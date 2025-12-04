const Command = require("../models/command");
const db = require("../config/db");

exports.getAll = (req, res) => {
  Command.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Command.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Command not found" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { produit_id, Qtte } = req.body;

  // validate input
  if (!produit_id || Qtte === undefined) {
    return res.status(400).json({ message: "produit_id and Qtte are required" });
  }

  const requestedQty = Number(Qtte);
  if (Number.isNaN(requestedQty) || requestedQty <= 0) {
    return res.status(400).json({ message: "Invalid Qtte value" });
  }

  // 1. Check product stock
  db.query("SELECT Qtte FROM produit WHERE id = ?", [produit_id], (err, productRows) => {
    if (err) return res.status(500).json(err);

    if (!productRows || productRows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const currentStock = Number(productRows[0].Qtte ?? 0);

    // 2. Check stock availability
    if (currentStock < requestedQty) {
      return res.status(400).json({ message: "Not enough stock", stock: currentStock });
    }

    // 3. Create command
    Command.create(req.body, (err, result) => {
      if (err) return res.status(500).json(err);

      // 4. Reduce product stock
      db.query(
        "UPDATE produit SET Qtte = Qtte - ? WHERE id = ?",
        [requestedQty, produit_id],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.status(201).json({
            id: result.insertId,
            ...req.body,
            message: "Command created & stock updated",
          });
        }
      );
    });
  });
};

exports.update = (req, res) => {
  (async () => {
    try {
      const id = req.params.id;
      const body = { ...req.body };

      // fetch existing command
      db.query("SELECT produit_id, Qtte FROM commande WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).json(err);
        if (!rows || rows.length === 0) return res.status(404).json({ message: "Command not found" });

        const oldProduitId = Number(rows[0].produit_id);
        const oldQtte = Number(rows[0].Qtte ?? 0);

        const targetProduitId = body.produit_id !== undefined ? Number(body.produit_id) : oldProduitId;
        const targetQtte = Number(body.Qtte ?? body.quantity ?? oldQtte);

        if (!targetProduitId || Number.isNaN(targetQtte) || targetQtte < 0) {
          return res.status(400).json({ message: "Invalid produit_id or Qtte" });
        }

        // get current stock for target product (and old product if different)
        const idsToQuery = oldProduitId === targetProduitId ? [targetProduitId] : [oldProduitId, targetProduitId];
        db.query(`SELECT id, Qtte FROM produit WHERE id IN (${idsToQuery.map(() => "?").join(",")})`, idsToQuery, (err2, prodRows) => {
          if (err2) return res.status(500).json(err2);
          if (!prodRows || prodRows.length === 0) return res.status(404).json({ message: "Product(s) not found" });

          const prodMap = prodRows.reduce((m, p) => {
            m[Number(p.id)] = Number(p.Qtte ?? 0);
            return m;
          }, {});

          const currentTargetStock = prodMap[targetProduitId] ?? 0;
          const effectiveAvailable = currentTargetStock + (oldProduitId === targetProduitId ? oldQtte : 0);

          if (effectiveAvailable < targetQtte) {
            return res.status(400).json({ message: "Not enough stock", stock: currentTargetStock });
          }

          // perform stock adjustments
          const operations = [];

          if (oldProduitId === targetProduitId) {
            const delta = targetQtte - oldQtte; // positive => take from stock; negative => return to stock
            if (delta !== 0) {
              operations.push((cb) =>
                db.query("UPDATE produit SET Qtte = Qtte - ? WHERE id = ?", [delta, targetProduitId], cb)
              );
            }
          } else {
            // return old qty to old product
            operations.push((cb) =>
              db.query("UPDATE produit SET Qtte = Qtte + ? WHERE id = ?", [oldQtte, oldProduitId], cb)
            );
            // subtract target qty from new product
            operations.push((cb) =>
              db.query("UPDATE produit SET Qtte = Qtte - ? WHERE id = ?", [targetQtte, targetProduitId], cb)
            );
          }

          // run operations sequentially
          const runOps = (ops, idx, cb) => {
            if (idx >= ops.length) return cb(null);
            ops[idx]((errOp) => {
              if (errOp) return cb(errOp);
              runOps(ops, idx + 1, cb);
            });
          };

          runOps(operations, 0, (opErr) => {
            if (opErr) return res.status(500).json(opErr);

            // ensure request body uses DB column name Qtte
            if (body.quantity !== undefined && body.Qtte === undefined) {
              body.Qtte = body.quantity;
              delete body.quantity;
            }

            Command.update(id, body, (err3) => {
              if (err3) return res.status(500).json(err3);
              res.json({ message: "Command updated" });
            });
          });
        });
      });
    } catch (ex) {
      console.error("update command error:", ex);
      res.status(500).json({ message: "Failed to update command", error: ex.message });
    }
  })();
};

exports.delete = (req, res) => {
  Command.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Command deleted" });
  });
};
