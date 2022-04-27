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
