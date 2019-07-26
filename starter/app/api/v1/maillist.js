const { LinRouter, NotFound } = require('lin-mizar');
const { Op } = require('sequelize');
const { Maillist } = require('../../models/maillist');
const { getSafeParamId } = require('../../libs/util');
const { CreateOrUpdateMaillistValidator } = require('../../validators/maillist');

const maillistApi = new LinRouter({
  prefix: '/v1/maillist'
});

// 获取所有联系人列表
maillistApi.get('/', async ctx => {
  const maillists = await Maillist.findAll();
  if (maillists.length < 1) {
    throw new NotFound({
      msg: '没有联系人信息'
    });
  }
  ctx.json(maillists);
});
// 创建联系人
maillistApi.post('/', async ctx => {
  const v = await new CreateOrUpdateMaillistValidator().validate(ctx);
  const maillist = await Maillist.findOne({
    where: {
      name: v.get('body.name'),
      delete_time: null
    }
  });
  if (maillist) {
    throw new NotFound({
      msg: '联系人已存在'
    });
  }
  const ml = new Maillist();
  ml.name = v.get('body.name');
  ml.tel = v.get('body.tel');
  ml.save();
  ctx.success({
    msg: '新建联系人成功'
  });
});
// 删除联系人
maillistApi.delete('/deleteMaillist', '/:id', async ctx => {
  const id = getSafeParamId(ctx);
  const maillist = await Maillist.findOne({
    where: {
      id,
      delete_time: null
    }
  });
  if (!maillist) {
    throw new NotFound({
      msg: '没有找到相关联系人'
    });
  }
  maillist.destroy();
  ctx.success({
    msg: '删除联系人成功'
  });
});
// 编辑、保存联系人
maillistApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateMaillistValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  const maillist = await Maillist.findById(id);
  if (!maillist) {
    throw new NotFound({
      msg: '没有找到相关联系人'
    });
  }
  maillist.name = v.get('body.name');
  maillist.tel = v.get('body.tel');
  maillist.save();
  ctx.success({
    msg: '保存成功'
  });
});
// 搜索联系人
maillistApi.get('/search/one', async ctx => {
  const v = await new CreateOrUpdateMaillistValidator().validate(ctx);
  const maillist = await Maillist.findOne({
    where: {
      name: {
        [Op.like]: `%${v.get('query.q')}%`
      },
      delete_time: null
    }
  });
  if (!maillist) {
    throw new NotFound({
      msg: '没有相关联系人'
    });
  }
  ctx.json(maillist);
});

module.exports = { maillistApi };