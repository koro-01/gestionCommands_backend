const db = require("../config/db");

const createCommandeTable = `
CREATE TABLE IF NOT EXISTS commande (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  destination VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  produit_id INT,
  preparateur_id INT,
  livreur_id INT,
  Qtte INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (produit_id) REFERENCES produit(id),
  FOREIGN KEY (preparateur_id) REFERENCES preparateur(id),
  FOREIGN KEY (livreur_id) REFERENCES livreur(id)
);
`;

db.query(createCommandeTable, (err, result) => {
  if (err) throw err;
  console.log("Table 'commande' created or already exists.");
});
