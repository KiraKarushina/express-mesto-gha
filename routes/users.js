const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regular = /https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/;

const {
  createUser, getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex(),
  }),
}), getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern((link) => { regular.test(link); }),
  }),
}), updateAvatar);
router.get('/users/me', getCurrentUser);

module.exports = router;
