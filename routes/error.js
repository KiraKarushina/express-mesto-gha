const router = require('express').Router(); // создали роутер

router.all('*', (req, res) => {
  res.status(404).send({message: 'Page not found'});
});

module.exports = router; // экспортировали роутер
