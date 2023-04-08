const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../customErrors/UnauthorizedError');

const secretJWT = 'some-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError();
  }

  const token = req.cookies.jwt || authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretJWT);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
