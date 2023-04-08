const Card = require('../models/card');
const statusCodes = require('../utils/statusCodes');
const messages = require('../utils/messages');

const { errorNames } = require('../utils/errorNames')
const { BadRequestError } = require('../customErrors/BadRequestRule');
const { NotFoundError } = require('../customErrors/NotFoundError');
const { ForbiddenError } = require('../customErrors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => next(err.name === errorNames.validation ? new BadRequestError() : err));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = async (req, res, next) => {
  const id = req.params.cardId;
  let card;
  try {
    card = await Card.findById(id)
      .orFail(new NotFoundError());
  } catch (error) {
    return next(error);
  }

  return card.owner.toString() === req.user._id
    ? card
      .delete()
      .then((card) => {
        if (card) {
          res.status(200).send({ data: card });
        } else {
          res.status(statusCodes.notFound).send({ message: messages.cardNotFound });
        }})
      .catch((err) => next(err.name === errorNames.cast ? new BadRequestError() : err))
    : next(new ForbiddenError());
};

module.exports.setLike = (req, res, next) => {
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
      if (err.name === errorNames.validation || err.name === errorNames.cast) {
        throw new BadRequestError();
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
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
      if (err.name === errorNames.validation || err.name === errorNames.cast) {
        throw new BadRequestError();
      }
      next(err);
    })
    .catch(next);
};
