const db = require("../config/db");

const createPreparateurTable = `
CREATE TABLE IF NOT EXISTS preparateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  tele VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

db.query(createPreparateurTable, (err, result) => {
  if (err) throw err;
  console.log("Table 'preparateur' created or already exists.");
});
