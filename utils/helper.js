module.exports.getErrorStatusCode = (err) => {

  console.log('1111', err.name);
  if (err.name === 'ValidationError') {
    return 400
  }
  if (err.name === 'ValidatorError') {
    return 401
  }
  return 500;
}