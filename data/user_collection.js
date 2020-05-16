const User = require('../models/user')
const IdGenerator = require('./id_generator')

class UserCollection {
  constructor() {
    this._userMap = new Map()
    this._incrementor = new IdGenerator()
  }

  /** Collection information */
  get size() { return this._userMap.size }
  get all() { return Array.from(this._userMap.values()) }

  /** Single record actions */
  addUser(userData) {
    const id = this._incrementor.next
    const user = new User(userData) 
    user.id = id
    this._userMap.set(id, user)
    return user
  }

  getUser(userId) { return this._userMap.get(userId) }

  updateUser(userId, newUserData) {
    const user = this._userMap.get(userId)
    user.update(newUserData)
    return user
  }

  deleteUser(userId) {
    const user = this._userMap.get(userId)
    this._userMap.delete(userId)
    return user
  }

  /** List actions */
  createUserList(list, userData) { return list.map(userId => this.addUser(userData)) }

  getUserList(list) { return list.map(userId => this.getUser(userId)) }

  updateUserList(list) { return list.map(({id, ...newData}) => this.updateUser(id, newData)) }

  deleteUserList(list) { return list.map(userId => this.deleteUser(userId)) }
}

module.exports = UserCollection
