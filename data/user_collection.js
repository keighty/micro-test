const User = require('../models/user')

class UserCollection {
  constructor() {
    this._userMap = new Map()
    this._incrementor = new IdIncrementor()
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

class IdIncrementor {
  ID_LENGTH = 5

  constructor() {
    this._currentId = 0
  }

  get current() { return this._toString() }

  get next() { 
    this._currentId++
    return this._toString()
  }

  _toString() { return `${this._currentId}`.padStart(this.ID_LENGTH, '0') }
}

module.exports = { UserCollection, IdIncrementor }
