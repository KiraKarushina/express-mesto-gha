const express = require('express');
const mongoose = require('mongoose');

const mainRouter = require('./routes/index')
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Временное решение

app.use((req, res, next) => {
  req.user = {
    _id: '64092683b2b6473040be44e7', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});
