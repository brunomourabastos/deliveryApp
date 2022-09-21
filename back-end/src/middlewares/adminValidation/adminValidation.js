const { CustomError } = require('../../../utils/CustomError');

const { adminSchema } = require('./adminSchema');

class AdminRegisterValidation {
  constructor(schema = adminSchema) {
    this.schema = schema;
  }

  validate(req, _res, next) {
    const requestInformations = req.body;

    const result = this.schema.safeParse(requestInformations);

    if (result.success) return next();

    const { issues: [{ message }] } = result.error;

    throw new CustomError(400, message);
  }
}

const adminValidation = new AdminRegisterValidation(adminSchema);

module.exports = {
  adminValidation,
};