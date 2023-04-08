const router = require('express').Router();

const {
  createUser, getUsers, getUser, updateProfile, updateAvatar, getCurrentUser
} = require('../controllers/users');

router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/me', getCurrentUser);

module.exports = router;
