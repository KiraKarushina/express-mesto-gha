const router = require('express').Router(); // создали роутер

const {
  createCard, getCards, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.delete('/cards/:cardId', deleteCard);
router.get('/cards', getCards);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', setLike);
router.delete('/cards/:cardId/likes', deleteLike);
// // обрабатываем ошибку для несущетсвующих роутов
// router.all('*', (req, res) => {
//   res.status(404).send({message: 'Page not found'});
// });

module.exports = router; // экспортировали роутер
