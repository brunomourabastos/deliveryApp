const { CustomError } = require('../../../utils/CustomError');
const { SalesImplementation } = require('./implementation');
const SaleProduct = require('../../database/models/SalesProducts');

class SalesServices {
  constructor() {
    this.salesImplementation = new SalesImplementation();
    this.salesProductsModel = SaleProduct;
  }

  async create(userId, saleData) {
    const { sellerId, products, deliveryAddress, deliveryNumber } = saleData;

    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    return this.salesImplementation.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    })
      .then(async (newSale) => {
        await this.salesProductsModel
          .bulkCreate(products.map((product) => ({ saleId: newSale.id, productId: product.id })));
        return newSale;
      });
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

  async readBySellerId(id) {
    return this.salesImplementation.readBySellerId(id)
      .then((sales) => sales);
  }

  async updateOne(id, status) {
    this.readOne(id).then(async (sale) => {
      await this.salesImplementation.updateOne(id, { ...sale, status });
    });
  }

  async delete(id) {
    await this.readOne(id);
    await this.salesImplementation.delete(id);
  }
}

module.exports = { SalesServices };