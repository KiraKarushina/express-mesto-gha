const router = require('express').Router();

const cards = require('./cards');
const error = require('./error');
const users = require('./users');

router.use(cards);
router.use(users);
router.use('*', error);

module.exports = router;
