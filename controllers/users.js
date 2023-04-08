const User = require('../models/user');

const { getErrorStatusCode } = require('../utils/helper');
const statusCodes = require('../utils/statusCodes');
const messages = require('../utils/messages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { errorNames } = require('../utils/errorNames')
const { BadRequestError } = require('../customErrors/BadRequestRule');
const { ConflictError } = require('../customErrors/ConflictError');
const { NotFoundError } = require('../customErrors/NotFoundError');
const { UnauthorizedError } = require('../customErrors/UnauthorizedError');

const tokenExp = '7d';
const secretJWT = 'some-secret-key';

module.exports.createUser = (req, res, next) => {
  // парсим body
  const { name, avatar, about, email, password } = req.body;

  //хэшируем пароль и создаем пользователя
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name: name,
      avatar: avatar,
      about: about,
      email: email,
      password: hash, // записываем хеш в базу
    })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === errorNames.mongo && err.code === statusCodes.mongo) {
          throw new ConflictError();
        }
        if (err.name === errorNames.validation) {
          throw new BadRequestError();
        }
        next(err);
      })
      .catch(next)
    )
};

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((data) => {
    if (!data) {
      throw new NotFoundError();
    }

    res.send({ data });
  })
  .catch((err) => next(err.name === errorNames.cast ? new BadRequestError() : err));

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => {
      if (err.name === errorNames.cast) {
        throw new BadRequestError();
      }

      next(err);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
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
      if (err.name === errorNames.validation || err.name === errorNames.cast) {
        throw new BadRequestError();
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === errorNames.validation || err.name === errorNames.cast) {
        throw new BadRequestError();
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, secretJWT, { expiresIn: tokenExp },
      );
      res
        .cookie('jwt', token, {
          maxAge: tokenExp,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: messages.ok });
    })
    .catch(() => next(new UnauthorizedError()));
};
