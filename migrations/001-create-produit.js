const db = require("../config/db");

const createProduitTable = `
CREATE TABLE IF NOT EXISTS produit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  Qtte INT DEFAULT 0,
  P_A DECIMAL(10,2),  -- prix achat
  P_V DECIMAL(10,2),  -- prix vente
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

db.query(createProduitTable, (err, result) => {
  if (err) throw err;
  console.log("Table 'produit' created or already exists.");
  // Do not close the connection here
});
