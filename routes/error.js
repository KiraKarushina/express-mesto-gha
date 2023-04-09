const router = require('express').Router(); // создали роутер

const NotFoundError = require('../customErrors/NotFoundError');

router.all('*', () => {
  throw new NotFoundError();
});

module.exports = router; // экспортировали роутер
