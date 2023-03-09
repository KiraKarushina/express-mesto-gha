const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(err.status).send({ message: err.message }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(err.status).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndDelete(id)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(err.status).send({ message: err.message }));
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(err.status).send({ message: err.message }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(err.status).send({ message: err.message }));
};
