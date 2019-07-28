'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Contact extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      name: this.name,
      tel: this.tel
    };
    return origin;
  }
}

Contact.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tel: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'contact',
      modelName: 'contact',
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Contact };