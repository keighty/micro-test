const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const { UserCollection } = require('../data/user_collection')

const userCollection = new UserCollection()

// GET ALL OR LIST OF USERS
router.get('/', function(req, res, next) {
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
router.post('/', function (req, res, next) {
  const data = req.body
  const users = data.map(userData => userCollection.addUser(userData))
  res.send(users)
});

// GET SINGLE USER
router.get('/:userId', function (req, res, next) {
  const userId = req.params.userId
  const user = userCollection.getUser(userId)
  res.send(user);
});

// UPDATE USER
router.put('/:userId', function (req, res, next) {
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

// UPDATE LIST OF USERS
router.put('/', function (req, res, next) {
  const data = req.body
  const updatedUsers = userCollection.updateUserList(data)
  res.send(updatedUsers);
});

// DELETE
router.delete('/:userId', function (req, res, next) {
  const userId = req.params.userId
  console.log(userId)
  const user = userCollection.deleteUser(userId)
  res.send(user);
});

// DELETE LIST OF USERS
router.delete('/', function (req, res, next) {
  const data = req.body
  const deletedUsers = userCollection.deleteUserList(data)
  res.send(deletedUsers);
});

module.exports = router;
