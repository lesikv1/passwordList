import { BaseModel } from 'startupjs/orm'

export default class CounterModel extends BaseModel {
  async addSelf (data = {}) {
    await this.root.addAsync(this.getCollection(), {
      ...data
    })
  }

}
