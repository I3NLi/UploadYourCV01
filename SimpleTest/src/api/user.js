import BaseRequest from './base-request'

export default class UserRequest extends BaseRequest {
  async login(params) {
    const res = await this.POST('login/', params)
    return res
  }
}