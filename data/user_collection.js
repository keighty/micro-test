const User = require('../models/user')

class UserCollection {
  constructor() {
    this.userMap = new Map()
  }

  getAll() {
    return this.userMap
  }

  addUser(userData) {
    // TODO create a user from the data first
    const user = new User()
    this.userMap.set(user.id, user)
    return user
  }

  getUser(userId) {
    return this.userMap.get(userId)
  }

  deleteUser(userId) {
    const user = this.userMap.get(userId)
    this.userMap.delete(userId)
    return user
  }

  updateUser(userId, newUserData) {
    const user = new User()
    user.id = userId
    this.userMap.set(userId, user)
    return user
  }
}

module.exports = UserCollection
