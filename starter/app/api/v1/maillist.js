const { LinRouter } = require('lin-mizar');
const { Maillist } = require('../../models/maillist');
const { getSafeParamId } = require('../../libs/util');

const maillistApi = new LinRouter({
  prefix: '/v1/maillist'
});

maillistApi.get('/:id', async ctx => {
  const id = getSafeParamId(ctx);
  const maillist = await Maillist.findOne({
    where: {
      id,
      delete_time: null
    }
  });
  ctx.json(maillist);
});

module.exports = { maillistApi };