/* Récupération de l'outil mongoose, schéma de données requis pour chaque sauce créée et export du modèle pour
l'enregistrement dans la base de données */

const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
