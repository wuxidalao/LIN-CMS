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

  async getBook(id) {
    const res = await get(`v1/book/${id}`)
    return res
  }
  // 编辑
  async editContact(id, info) {
    const res = await put(`v1/contact/${id}`, info)
    return res
  }

  async delectBook(id) {
    const res = await _delete(`v1/book/${id}`)
    return res
  }

  async getBooks() {
    const res = await get('v1/book/')
    return res
  }
}

export default new Contact()
