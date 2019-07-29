'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateOrUpdateContactValidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '请输入姓名');
    this.tel = new Rule('isNotEmpty', '请输入电话');
  }
}

module.exports = { CreateOrUpdateContactValidator };