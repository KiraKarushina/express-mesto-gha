const router = require('express').Router();

const {
  createUser, getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
