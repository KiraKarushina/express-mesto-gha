const router = require('express').Router(); // создали роутер

const {
  createUser, getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

// обрабатываем ошибку для несущетсвующих роутов
router.all('*', (req, res) => {
  res.status(404).send({message: 'Page not found'});
});

module.exports = router; // экспортировали роутер
