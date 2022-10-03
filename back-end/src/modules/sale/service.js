const { CustomError } = require('../../../utils/CustomError');
const { SalesImplementation } = require('./implementation');
const SaleProduct = require('../../database/models/SalesProducts');

class SalesServices {
  constructor() {
    this.salesImplementation = new SalesImplementation();
    this.salesProductsModel = SaleProduct;
  }

  create(userId, saleData) {
    const { sellerId, products, deliveryAddress, deliveryNumber, total } = saleData;

    return this.salesImplementation.create({
      userId,
      sellerId,
      deliveryAddress,
      deliveryNumber,
      totalPrice: total,
    })
      .then(async (newSale) => {
        await this.salesProductsModel.bulkCreate(products.map((product) => (
            { saleId: newSale.id, productId: product.productId, quantity: product.quantity }
          )));
        return newSale;
      });
  }

  readAll() {
    return this.salesImplementation.readAll().then((sales) => sales);
  }

  readOne(id) {
    return this.salesImplementation.readOne(id).then((sale) => {
        if (!sale) throw new CustomError(404, 'Sale not found');
        return sale;
      });
  }

  readBySellerId(id) {
    return this.salesImplementation.readBySellerId(id).then((sales) => sales);
  }

  async updateOne(id, status) {
    await this.readOne(id).then(async (sale) => {
      const updatedSale = {
        id: sale.id,
        userId: sale.userId,
        sellerId: sale.sellerId,
        totalPrice: sale.totalPrice,
        deliveryAddress: sale.deliveryAddress,
        deliveryNumber: sale.deliveryNumber,
        saleDate: sale.saleDate,
        status,
      };
      await this.salesImplementation.updateOne(id, updatedSale);
    });
  }

  async delete(id) {
    await this.readOne(id);
    await this.salesImplementation.delete(id);
  }
}

module.exports = { SalesServices };