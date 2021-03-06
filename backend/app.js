// Import d'express pour la création de l'application, de mongoose pour faciliter les interaction avec la bdd et path pour interagir avec le système de fichiers
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const app = express();

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

// Middleware permettant un accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

// Export de l'application pour permettre l'accès depuis les autres fichiers
module.exports = app;
