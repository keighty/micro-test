const User = require('../models/user')
const IdGenerator = require('./id_generator')

class UserCollection {
  constructor(logger) {
    this._userMap = new Map()
    this._incrementor = new IdGenerator()
    this._logger = logger
  }

  /** Collection information */
  get size() {
    return this._userMap.size
  }
  get all() {
    return Array.from(this._userMap.values())
  }

  /** Single record actions */
  addUser(userData) {
    const id = this._incrementor.next
    // use the same logger instance if one is available
    const user = new User(userData, this._logger)
    user.id = id
    this._userMap.set(id, user)
    return user
  }

  getUser(userId) {
    const user = this._userMap.get(userId)
    if (user) {
      return user
    } else {
      this._logMissingUser(userId)
    }
  }

  updateUser(userId, newData) {
    const user = this._userMap.get(userId)
    if (user) {
      const currentData = user.toJSON()
      user.update(newData)
      this._logUpdatedUser(currentData, newData)
      return user
    } else {
      this._logMissingUser(userId)
    }
  }

  deleteUser(userId) {
    const user = this._userMap.get(userId)
    if (user) {
      this._userMap.delete(userId)
      this._logDeletedUser(user)
      return user
    } else {
      this._logMissingUser(userId)
    }
  }

  /** List actions */
  createUserList(list) {
    return list.map((userData) => this.addUser(userData))
  }

  getUserList(list) {
    return list.map((userId) => this.getUser(userId))
  }

  updateUserList(list) {
    return list.map(({ id, ...newData }) => this.updateUser(id, newData))
  }

  deleteUserList(list) {
    return list.map((userId) => this.deleteUser(userId))
  }

  /** Log destructive actions */
  _logDeletedUser(user) {
    this._logger && this._logger.log('warn', 'Deleted user', user.toJSON())
  }
  _logUpdatedUser(oldValues, newValues) {
    this._logger &&
      this._logger.log(
        'warn',
        'Updated user',
        `originalValues: ${oldValues}; newValues: ${newValues}`
      )
  }
  _logMissingUser(userId) {
    this._logger && this._logger.log('warn', 'Unknown userId', { userId })
  }
}

module.exports = UserCollection
