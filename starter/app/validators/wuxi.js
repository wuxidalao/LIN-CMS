'use strict';
const { LinValidator, Rule } = require('lin-mizar');

class WuxiSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateBookValidator extends LinValidator {
  constructor () {
    super();
    // title author summary image
    this.title = new Rule('isNotEmpty', '标题不可为空', { min: 1, max: 50 });
    this.author = new Rule('isNotEmpty', '作者不可为空');
    this.summary = new Rule('isNotEmpty', '综述不可为空');
    this.image = [
      new Rule('isNotEmpty', '图片必须传入'),
      new Rule('isLength', '长度必须在0-100之间', { min: 0, max: 100 })
    ];
  }
}

module.exports = { WuxiSearchValidator, CreateOrUpdateBookValidator };
