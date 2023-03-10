const router = require('express').Router();

const {
  createCard, getCards, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.delete('/cards/:cardId', deleteCard);
router.get('/cards', getCards);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', setLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
