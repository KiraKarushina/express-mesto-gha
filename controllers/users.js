const User = require('../models/user');

const { getErrorStatusCode } = require('../utils/helper');
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");

module.exports.createUser = (req, res) => {
  const { name, avatar, about } = req.body;
  User.create({ name, avatar, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError :  err.message);
      res.status(codeStatus).send({ message: message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      console.log('uiii');
      res.send({ data: users })
    })
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError :  err.message);
      res.status(codeStatus).send({ message: message });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(statusCodes.notFound).send({ message: messages.userNotFound });
      }
    })
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError :  err.message);
      res.status(codeStatus).send({ message: message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError :  err.message);
      res.status(codeStatus).send({ message: message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const codeStatus = getErrorStatusCode(err);
      const message = (codeStatus === statusCodes.serverError ? messages.serverError :  err.message);
      res.status(codeStatus).send({ message: message });
    });
};
