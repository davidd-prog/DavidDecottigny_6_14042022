const Sauce = require("../models/Sauce");
const fs = require("fs");

// Mécanique de la création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de présentation d'une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de modification d'une sauce
exports.updateOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new Error("Sauce non trouvée !"),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(403).json({
        error: new Error("Requête non autorisée !"),
      });
    }
  });
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de suppression d'une sauce
exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({
          error: new Error("Sauce non trouvée !"),
        });
      }
      if (sauce.userId !== req.auth.userId) {
        return res.status(403).json({
          error: new Error("Requête non autorisée !"),
        });
      }
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({
              message: "Sauce supprimée !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Mécanique like/dislike des sauces
exports.likeSauce = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;
  console.log(req.body);

  if (like == 1) {
    Sauce.updateOne(
      { _id: sauceId },
      { $push: { usersLiked: userId }, $inc: { likes: +1 } }
    )
      .then(() => res.status(200).json({ message: "Like attribué !" }))
      .catch((error) => res.status(400).json({ error }));
  }

  if (like == 0) {
    Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: "Pas d'évaluation !" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() => res.status(200).json({ message: "Pas d'évaluation !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }

  if (like == -1) {
    Sauce.updateOne(
      { _id: sauceId },
      { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
    )
      .then(() => res.status(200).json({ message: "Dislike attribué !" }))
      .catch((error) => res.status(400).json({ error }));
  }

  // Mécanique like/dislike avec la méthode switch
  // switch (like) {
  //   case 1:
  //     Sauce.updateOne(
  //       { _id: sauceId },
  //       { $push: { usersLiked: userId }, $inc: { likes: +1 } }
  //     )
  //       .then(() => res.status(200).json({ message: "like attribué !" }))
  //       .catch((error) => res.status(400).json({ error }));

  //     break;

  //   case 0:
  //     Sauce.findOne({ _id: sauceId })
  //       .then((sauce) => {
  //         if (sauce.usersLiked.includes(userId)) {
  //           Sauce.updateOne(
  //             { _id: sauceId },
  //             { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
  //           )
  //             .then(() =>
  //               res.status(200).json({ message: "Pas d'évaluation !" })
  //             )
  //             .catch((error) => res.status(400).json({ error }));
  //         }
  //         if (sauce.usersDisliked.includes(userId)) {
  //           Sauce.updateOne(
  //             { _id: sauceId },
  //             { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
  //           )
  //             .then(() =>
  //               res.status(200).json({ message: "Pas d'évaluation !" })
  //             )
  //             .catch((error) => res.status(400).json({ error }));
  //         }
  //       })
  //       .catch((error) => res.status(404).json({ error }));

  //     break;

  //   case -1:
  //     Sauce.updateOne(
  //       { _id: sauceId },
  //       { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
  //     )
  //       .then(() => {
  //         res.status(200).json({ message: "Dislike attribué !" });
  //       })
  //       .catch((error) => res.status(400).json({ error }));
  //     break;
  // }
};
