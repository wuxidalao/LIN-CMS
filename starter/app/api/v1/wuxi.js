'use strict';
const { LinRouter } = require('lin-mizar');
const { Op } = require('sequelize');
const { Wuxi } = require('../../models/wuxi');
const { getSafeParamId } = require('../../libs/util');
const { WuxiSearchValidator, CreateOrUpdateBookValidator } = require('../../validators/wuxi');
const { NotFound } = require('../../libs/err-code');

const wuxiApi = new LinRouter({
  prefix: '/v1/wuxi'
});

// 返回图书的所有信息
wuxiApi.get('/:id', async ctx => {
  const id = getSafeParamId(ctx);
  const wuxi = await Wuxi.findOne({
    where: {
      id,
      delete_time: null
    }
  });
  ctx.json(wuxi);
});

// 搜索图书
wuxiApi.get('/search/one', async ctx => {
  const v = await new WuxiSearchValidator().validate(ctx);
  const wuxi = await Wuxi.findOne({
    where: {
      title: {
        [Op.like]: `%${v.get('query.q')}%`
      },
      delete_time: null
    }
  });
  if (!wuxi) {
    throw new NotFound();
  }
  ctx.json(wuxi);
});

// 创建图书
wuxiApi.post('/', async ctx => {
  const v = await new CreateOrUpdateBookValidator().validate(ctx);
  const wuxi = await Wuxi.findOne({
    where: {
      title: v.get('body.title'),
      delete_time: null
    }
  });
  if (wuxi) {
    throw new Forbidden({
      msg: '图书已存在'
    });
  }
  const bk = new Wuxi();
  bk.title = v.get('body.title');
  bk.author = v.get('body.author');
  bk.summary = v.get('body.summary');
  bk.image = v.get('body.image');
  bk.save();// 插入或更新数据表
  ctx.success({
    msg: '创建图书成功'
  });
});

// 更新图书
wuxiApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateBookValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  const book = await Wuxi.findById(id);
  if (!book) {
    throw new NotFound({
      msg: '没有找到相关书籍'
    });
  }
  book.title = v.get('body.title');
  book.author = v.get('body.author');
  book.summary = v.get('body.summary');
  book.image = v.get('body.image');
  book.save();
  ctx.success({
    msg: '更新图书成功'
  });
});

// 删除图书
wuxiApi.linDelete(
  'deleteWuxi',
  '/:id',
  {
    auth: '删除图书',
    module: '图书',
    mount: false
  },
  async ctx => {
    const id = getSafeParamId(ctx);
    const wuxi = await Wuxi.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!wuxi) {
      throw new NotFound({
        msg: '没有找到相关书籍'
      });
    }
    wuxi.destroy();
    ctx.success({
      msg: '删除图书成功'
    });
  }
);

// 获取所有图书
wuxiApi.get('/', async ctx => {
  const wuxis = await Wuxi.findAll();
  if (wuxis.length < 1) {
    throw new NotFound({
      msg: '没有找到相关书籍'
    });
  }
  ctx.json(wuxis);
});

module.exports = { wuxiApi };