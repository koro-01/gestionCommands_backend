const db = require("../config/db");

const createLivreurTable = `
CREATE TABLE IF NOT EXISTS livreur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  tele VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

db.query(createLivreurTable, (err, result) => {
  if (err) throw err;
  console.log("Table 'livreur' created or already exists.");
});
