const { LinRouter, NotFound } = require('lin-mizar');
const { Op } = require('sequelize');
const { Contact } = require('../../models/contact');
const { getSafeParamId } = require('../../libs/util');
const { CreateOrUpdateContactValidator } = require('../../validators/contact');

const contactApi = new LinRouter({
  prefix: '/v1/contact'
});

// 获取所有联系人列表 ok
contactApi.get('/', async ctx => {
  const contact = await Contact.findAll();
  if (contact.length < 1) {
    throw new NotFound({
      msg: '没有联系人信息'
    });
  }
  ctx.json(contact);
});
// 创建联系人 ok
contactApi.post('/', async ctx => {
  const v = await new CreateOrUpdateContactValidator().validate(ctx);
  const contact = await Contact.findOne({
    where: {
      name: v.get('body.name'),
      delete_time: null
    }
  });
  if (contact) {
    throw new NotFound({
      msg: '联系人已存在'
    });
  }
  const ml = new Contact();
  ml.name = v.get('body.name');
  ml.tel = v.get('body.tel');
  ml.save();
  ctx.success({
    msg: '新建联系人成功'
  });
});
// 删除联系人
contactApi.linDelete('/deleteContact', '/:id',
  {
    auth: '删除图书',
    module: '图书',
    mount: false
  },
  async ctx => {
    const id = getSafeParamId(ctx);
    const contact = await Contact.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!contact) {
      throw new NotFound({
        msg: '没有找到联系人'
      });
    }
    contact.destroy();
    ctx.success({
      msg: '删除联系人成功'
    });
  });
// 编辑、保存联系人 ok
contactApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateContactValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  const contact = await Contact.findByPk(id);
  if (!contact) {
    throw new NotFound({
      msg: '没有找到相关联系人'
    });
  }
  contact.name = v.get('body.name');
  contact.tel = v.get('body.tel');
  contact.save();
  ctx.success({
    msg: '保存成功'
  });
});
// 搜索联系人
contactApi.get('/search/one', async ctx => {
  const v = await new CreateOrUpdateContactValidator().validate(ctx);
  const contact = await Contact.findOne({
    where: {
      name: {
        [Op.like]: `%${v.get('query.q')}%`
      },
      delete_time: null
    }
  });
  if (!contact) {
    throw new NotFound({
      msg: '没有相关联系人'
    });
  }
  ctx.json(contact);
});

module.exports = { contactApi };