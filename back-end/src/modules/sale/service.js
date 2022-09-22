const { CustomError } = require('../../../utils/CustomError');
const { SalesImplementation } = require('./implementation');

class SalesServices {
  constructor() {
    this.salesImplementation = new SalesImplementation();
  }

  async create(sale) {
    // Verificações
    return this.salesImplementation.create(sale).then((newSale) => newSale);
  }

  async readAll() {
    return this.salesImplementation.readAll().then((sales) => sales);
  }

  async readOne(id) {
    return this.salesImplementation.readOne(id)
      .then((sale) => {
        if (!sale) throw new CustomError(404, 'Sale not found');
        return sale;
      });
  }

  async updateOne(id, sale) {
    await this.readOne(id);
    return this.salesImplementation.updateOne(id, sale)
      .then((updatedSale) => updatedSale);
  }

  async delete(id) {
    await this.readOne(id);
    await this.salesImplementation.delete(id);
  }
}

module.exports = { SalesServices };