const Card = require('../models/card');
const { getErrorStatusCode } = require('../utils/helper');
const statusCodes = require('../utils/statusCodes');
const messages = require('../utils/messages');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError : err.message);
      res.status(codeStatus).send({ message });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError : err.message);
      res.status(codeStatus).send({ message });
    });
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndDelete(id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(statusCodes.notFound).send({ message: messages.cardNotFound });
      }
    })
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError : err.message);
      res.status(codeStatus).send({ message });
    });
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(statusCodes.notFound).send({ message: messages.cardNotFound });
      }
    })
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError : err.message);
      res.status(codeStatus).send({ message });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(statusCodes.notFound).send({ message: messages.cardNotFound });
      }
    })
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError : err.message);
      res.status(codeStatus).send({ message });
    });
};
