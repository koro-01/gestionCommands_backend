const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const livreurRoutes = require("./routes/livreurRoutes");
const preparateurRoutes = require("./routes/preparateurRoutes");
const commandRoutes = require("./routes/commandRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/livreurs", livreurRoutes);
app.use("/preparateurs", preparateurRoutes);
app.use("/commands", commandRoutes);

app.get("/test", (req, res) => res.json({ status: "API working" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
