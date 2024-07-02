const handleError = (res, err) => {
  let message = err.message || 'Internal Server Error';
  if (err) {
    message = err.message;
  } else {
    message = 'fill in the message';
  }
  res
    .status(400)
    .send({
      status: true,
      message,
    })
    .end();
};
module.exports = handleError;
