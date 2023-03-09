module.exports.getErrorStatusCode = (err) => {
  console.log('1111', err, err.name);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return 400;
  }

  return 500;
};
