const Sales = require('../../database/models/Sales');
const Products = require('../../database/models/Products');
const Users = require('../../database/models/Users');

class SalesImplementation {
  constructor() {
    this.sequelizeSaleModel = Sales;
    this.sequelizeProductsModel = Products;
  }

  create(sale) {
    return this.sequelizeSaleModel.create(sale).then((newSale) => newSale);
  }

  readAll() {
    return this.sequelizeSaleModel.findAll({ attributes: { exclude: ['userId', 'sellerId'] } })
      .then((sales) => sales);
  }

  readAllById(whereQuery) {
    return this.sequelizeSaleModel.findAll({
      where: whereQuery,
      attributes: { exclude: ['userId', 'sellerId'] },
    }).then((sales) => sales);
  }

  readOne(id) {
    return this.sequelizeSaleModel.findByPk(id, {
      include: [{ model: Products, as: 'saleProducts', through: { attributes: ['quantity'] } }, 
      { model: Users, as: 'seller', attributes: ['name'] }],
      attributes: { exclude: ['userId', 'sellerId'] },
    }).then((sale) => sale);
  }

  async updateOne(id, sale) {
    await this.sequelizeSaleModel.update(sale, { where: { id } });
  }

  async delete(id) {
    await this.sequelizeSaleModel.destroy({ where: { id } });
  }
}

module.exports = { SalesImplementation };
