module.exports.getErrorStatusCode = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return 400;
  }

  return 500;
};
