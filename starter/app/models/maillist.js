'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Maillist extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      name: this.name,
      tel: this.tel
    };
    return origin;
  }
}

Maillist.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    tel: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'mailList',
      modelName: 'maillist',
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Maillist };