const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const UserCollection = require('../data/user_collection')
const logger = require('../config/logger')

const statsd = (path) => {
  return (req, res, next) => {
    var method = req.method || 'unknown_method'
    req.statsdKey = ['http', method.toLowerCase(), path].join('.')
    next()
  }
}

/** Initialize the in-memory datastore */
const userCollection = new UserCollection(logger)

/**
 * routes for list of users
 * localhost:3000/users
 */
// GET ALL OR LIST OF USERS
router.get('/', statsd('getUserList'), (req, res, next) => {
  const { query } = req
  if (!query.list) {
    res.send(userCollection.all)
  } else {
    try {
      const list = query.list.split(',')
      const users = userCollection.getUserList(list)
      res.send(users)
    } catch (err) {
      next(err)
    }
  }
})

// CREATE SINGLE OR LIST OF USERS
router.post('/', statsd('createUserList'), (req, res, next) => {
  const data = req.body
  try {
    const users = userCollection.createUserList(data)
    res.send(users)
  } catch (err) {
    next(err)
  }
})

// UPDATE LIST OF USERS
router.put('/', statsd('updateUserList'), (req, res, next) => {
  const data = req.body
  try {
    const updatedUsers = userCollection.updateUserList(data)
    res.send(updatedUsers)
  } catch (err) {
    next(err)
  }
})

// DELETE LIST OF USERS
router.delete('/', statsd('deleteUserList'), (req, res, next) => {
  const data = req.body
  try {
    const deletedUsers = userCollection.deleteUserList(data)
    res.send(deletedUsers)
  } catch (err) {
    next(err)
  }
})

/**
 * routes for a specific userId
 * localhost:3000/users/:userId
 */
// GET SINGLE USER
router.get('/:userId', statsd('getUser'), (req, res, next) => {
  const userId = req.params.userId
  try {
    const user = userCollection.getUser(userId)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// UPDATE SINGLE USER
router.put('/:userId', statsd('updateUser'), (req, res, next) => {
  const data = req.body
  const userId = req.params.userId
  try {
    const user = userCollection.getUser(userId)
    userCollection.updateUser(userId, data)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// DELETE SINGLE USER
router.delete('/:userId', statsd('deleteUser'), (req, res, next) => {
  const userId = req.params.userId
  try {
    const user = userCollection.deleteUser(userId)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
