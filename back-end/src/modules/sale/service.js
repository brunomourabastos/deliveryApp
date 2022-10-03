const { StatusCodes } = require('http-status-codes');
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
        const newSalesProducts = products.map((product) => (
          { saleId: newSale.id, productId: product.productId, quantity: product.quantity }
        ));
        await this.salesProductsModel.bulkCreate(newSalesProducts);
        return newSale.id;
      });
  }

  readAll() {
    return this.salesImplementation.readAll().then((sales) => sales);
  }

  readOne(id) {
    return this.salesImplementation.readOne(id).then((sale) => {
        if (!sale) throw new CustomError(StatusCodes.NOT_FOUND, 'Sale not found');
        return sale;
      });
  }

  readAllById(id, role) {
    const whereQuery = (role === 'seller') ? { sellerId: id } : { userId: id };
    return this.salesImplementation.readAllById(whereQuery).then((sales) => sales);
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