const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { regular } = require('./utils/constants');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const statusCodes = require('./utils/statusCodes');
const messages = require('./utils/messages');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');

const mainRouter = require('./routes/index');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use(mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(
  (err, req, res, next) => {
    const {
      statusCode = statusCodes.internal,
      message = messages.internal,
    } = err;

    res.status(statusCode).send({ message });
    next();
  },
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});
