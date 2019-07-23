/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Wuxi {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  // 创建图书
  async addWuxi(info) {
    const res = await post('v1/wuxi/', info)
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象

  // 查询指定id图书
  async getWuxi(id) {
    const res = await get(`v1/wuxi/${id}`)
    return res
  }

  // 更新指定id图书
  async editWuxi(id, info) {
    const res = await put(`v1/wuxi/${id}`, info)
    return res
  }

  // 删除指定id图书
  async delectWuxi(id) {
    const res = await _delete(`v1/wuxi/${id}`)
    return res
  }

  // 获取所有图书
  async getWuxis() {
    const res = await get('v1/wuxi/')
    return res
  }
}

export default new Wuxi()
