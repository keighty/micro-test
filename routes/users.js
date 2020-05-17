const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const UserCollection = require('../data/user_collection')
const logger = require('../config/logger')

const statsd = (path) => {
  return (req, res, next) => {
    var method = req.method || 'unknown_method';
    req.statsdKey = ['http', method.toLowerCase(), path].join('.');
    next();
  };
}

/** Initialize the in-memory datastore */
const userCollection = new UserCollection(logger)

/**
 * localhost:3000/users
 */

// GET ALL OR LIST OF USERS
router.get('/', statsd('getUserList'), (req, res, next) => {
  const { query } = req
  if (!query.list) {
    res.send(userCollection.all)
  } else { 
    const list = query.list.split(',')
    const users = userCollection.getUserList(list)
    res.send(users)
  }
});

// CREATE SINGLE OR LIST OF USERS
router.post('/', statsd('createUserList'), (req, res, next) => {
  const data = req.body
  const users = userCollection.createUserList(data)
  res.send(users)
});

// UPDATE LIST OF USERS
router.put('/', statsd('updateUserList'), (req, res, next) => {
  const data = req.body
  const updatedUsers = userCollection.updateUserList(data)
  res.send(updatedUsers);
});

// DELETE LIST OF USERS
router.delete('/', statsd('deleteUserList'), (req, res, next) => {
  const data = req.body
  const deletedUsers = userCollection.deleteUserList(data)
  res.send(deletedUsers);
});

/**
 * localhost:3000/users/:userId
 */


// GET SINGLE USER
router.get('/:userId', statsd('getUser'), (req, res, next) => {
  const userId = req.params.userId
  const user = userCollection.getUser(userId)
  res.send(user);
});

// UPDATE SINGLE USER
router.put('/:userId', statsd('updateUser'), (req, res, next) => {
  const data = req.body
  const userId = req.params.userId
  const user = userCollection.getUser(userId)
  if (!user) {
    res.status(404).send(`Error updating user: no userId ${userId}`)
  } else {
    userCollection.updateUser(userId, data)
  }
  res.send(user);
});

// DELETE SINGLE USER
router.delete('/:userId', statsd('deleteUser'), (req, res, next) => {
  const userId = req.params.userId
  const user = userCollection.deleteUser(userId)
  res.send(user);
});


module.exports = router;
