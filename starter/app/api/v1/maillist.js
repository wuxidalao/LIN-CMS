const { LinRouter } = require('lin-mizar');
const { Maillist } = require('../../models/maillist');
const { getSafeParamId } = require('../../libs/util');

const maillistApi = new LinRouter({
  prefix: '/v1/maillist'
});

module.exports = { maillistApi };