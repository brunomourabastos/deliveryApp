class GlobalError {
  constructor(defaultStatus = 500) {
    this.defaultStatus = defaultStatus;
    this.defaultMessage = 'Internal Server Error';
  }

  handle(error, _req, res, _next) {
    const errStatus = error.status || this.defaultStatus;
    const errMessage = error.message || this.defaultMessage;
    return res.status(errStatus).json({ message: errMessage });
  }
}

const globalError = new GlobalError();

module.exports = {
  globalError,
};