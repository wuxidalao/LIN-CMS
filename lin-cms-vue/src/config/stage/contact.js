const mailRouter = {
  route: null,
  name: null,
  title: '通讯录',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/contact/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加联系人',
      type: 'view',
      name: 'ContactAdd',
      route: '/contact/add',
      filePath: 'views/contact/ContactAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '联系人列表',
      type: 'view',
      name: 'ContactList',
      route: '/contact/list',
      filePath: 'views/contact/ContactList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default mailRouter
