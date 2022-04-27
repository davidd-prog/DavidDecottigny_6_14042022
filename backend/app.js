const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://DDadmin_user:cqbodzkb65@cluster0.gwrtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

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

const userRoutes = require("./routes/user");

app.use("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      userId: "utilisateur",
      name: "sauce prototype",
      manufacturer: "le chef cuisinier",
      description: "nouvel essai de sauce",
      mainPepper:
        "https://pixabay.com/fr/photos/soupe-%c3%a0-la-tomate-tomate-soupe-482403/",
      heat: 8,
      likes: 0,
      dislikes: 0,
      usersLiked: [""],
      usersDisliked: [""],
    },
  ];
  res.status(200).json(stuff);
});

app.use("/api/auth", userRoutes);

module.exports = app;
