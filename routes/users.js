const express = require('express');
const router = express.Router();
const { UserCollection } = require('../data/user_collection')

const userCollection = new UserCollection()

// GET ALL
router.get('/', function(req, res, next) {
  res.send(userCollection.all)
});

// CREATE
router.post('/', function (req, res, next) {
  const data = req.body
  const user = userCollection.addUser(data)
  res.send(user)
});

// GET USER
router.get('/:userId', function (req, res, next) {
  const userId = req.params.userId
  const user = userCollection.getUser(userId)
  res.send(user);
});

// UPDATE
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

// DELETE
router.delete('/:userId', function (req, res, next) {
  const userId = req.params.userId
  console.log(userId)
  const user = userCollection.deleteUser(userId)
  res.send(user);
});

module.exports = router;
