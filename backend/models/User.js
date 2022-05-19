// Création d'un modèle sécurisé de l'adresse email utilisateur
const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: "L'adrese e-mail existe déjà !",
  },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
