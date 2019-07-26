'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateOrUpdateMaillistValidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '请输入姓名');
    this.tel = new Rule('isInt', 'tel必须为正整数', { min: 11, max: 11 });
  }
}

module.exports = { CreateOrUpdateMaillistValidator };