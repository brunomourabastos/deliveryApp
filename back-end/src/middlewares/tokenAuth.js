const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../../utils/CustomError');
const { token } = require('../../utils/token/Token');

class TokenAuth {
  constructor(invalid = StatusCodes.BAD_REQUEST, notFound = StatusCodes.NOT_FOUND) {
    this.invalid = invalid;
    this.notFound = notFound;
  }

  handle(req, res, next) {
    const { authorization: userToken } = req.headers;

    if (!userToken) {
      throw new CustomError(this.notFound, 'Token not found');
    }

    const { data: userLoginInfos } = token.verify(userToken);

    if (!userLoginInfos) {
      throw new CustomError(this.invalid, 'Invalid or expired token');
    }

    return next();
  }
}

const tokenAuth = new TokenAuth();

module.exports = {
  tokenAuth,
};