'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Wuxi extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      title: this.title,
      author: this.author,
      summary: this.summary,
      image: this.image,
      create_time: this.create_time
    };
    return origin;
  }
}

Wuxi.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true // 自增
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(30),
      allowNull: true,
      defaultValue: '未名'
    },
    summary: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'wuxi',
      modelName: 'wuxi',
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Wuxi };