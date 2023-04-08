const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const statusCodes =  require('./utils/statusCodes');
const messages =  require('./utils/messages')

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth')

const mainRouter = require('./routes/index');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(mainRouter);

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
