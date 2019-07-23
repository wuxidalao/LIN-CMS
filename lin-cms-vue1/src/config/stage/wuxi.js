const bookRouter = {
  route: null,
  name: null,
  title: '吴习管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/wuxi/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加吴习',
      type: 'view',
      name: 'wuxiAdd',
      route: '/wuxi/add',
      filePath: 'views/wuxi/WuxiAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '吴习列表',
      type: 'view',
      name: 'wuxiList',
      route: '/wuxi/list',
      filePath: 'views/wuxi/WuxiList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '吴习编辑',
      type: 'view',
      name: 'wuxiEdit',
      route: '/wuxi/edit',
      filePath: 'views/wuxi/WuxiEdit.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default bookRouter
