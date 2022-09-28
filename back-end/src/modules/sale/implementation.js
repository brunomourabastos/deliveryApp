const Sales = require('../../database/models/Sales');
const Users = require('../../database/models/Users');

class SalesImplementation {
  constructor() {
    this.sequelizeSaleModel = Sales;
    this.sequelizeUserModel = Users;
  }

  async create(sale) {
    return this.sequelizeSaleModel.create(sale).then((newSale) => newSale);
  }

  async readAll() {
    return this.sequelizeSaleModel.findAll({ attributes: { exclude: ['userId', 'sellerId'] } })
      .then((sales) => sales);
  }

  async readBySellerId(id) {
    return this.sequelizeSaleModel.findAll({
      where: { sellerId: id },
      attributes: { exclude: ['userId', 'sellerId'] },
    }).then((sales) => sales);
  }

  async readOne(id) {
    return this.sequelizeSaleModel.findByPk(id, { attributes: { exclude: ['userId', 'SellerId'] } })
      .then((sale) => sale);
  }

  async updateOne(id, sale) {
    await this.sequelizeSaleModel.update(sale, { where: { id } });
  }

  async delete(id) {
    await this.sequelizeSaleModel.destroy({ where: { id } });
  }
}

module.exports = { SalesImplementation };
