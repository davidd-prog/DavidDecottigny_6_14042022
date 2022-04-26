const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://DDadmin_user:cqbodzkb65@cluster0.gwrtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res) => {
  console.log("Réponse envoyée avec succès !");
});

app.use("/api/auth", userRoutes);

module.exports = app;
