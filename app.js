const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Временное решение

app.use((req, res, next) => {
  req.user = {
    _id: '64092683b2b6473040be44e7', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});
