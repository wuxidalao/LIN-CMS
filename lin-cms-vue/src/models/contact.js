/* eslint-disable class-methods-use-this */
import {
  post,
  get,
  put,
  _delete,
} from '@/lin/plugins/axios'


class Contact {
  // 获取所有列表
  async getContacts(info) {
    const res = await get('v1/contact/', info)
    return res
  }

  // 获取一个
  async getContact(id) {
    const res = await get(`v1/book/${id}`)
    return res
  }

  // 创建联系人
  async createContact(info) {
    const res = await post('v1/contact/', info)
    return res
  }

  // 编辑
  async editContact(id, info) {
    const res = await put(`v1/contact/${id}`, info)
    return res
  }

  // 删除
  async deleteContact(id) {
    const res = await _delete(`v1/contact/${id}`)
    return res
  }

  // 搜索
  async searchContact(q) {
    const res = await get(`v1/contact/${q}`)
    return res
  }
}

export default new Contact()
