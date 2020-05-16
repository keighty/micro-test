const express = require('express');
const router = express.Router();
const { UserCollection } = require('../data/user_collection')

const userCollection = new UserCollection()


/* curl http://localhost:3000/users */
router.get('/', function(req, res, next) {
  res.send(userCollection.getAll())
});

/* GET user. */
router.get('/:userId', function (req, res, next) {
  const userId = req.params.userId
  const user = userCollection.getUser(userId)
  res.send(user);
});

/* curl -X POST http://localhost:3000/users/create */
router.post('/create', function (req, res, next) {
  const data = req.body
  const user = userCollection.addUser(data)
  res.send("ha")
});


/* UPDATE user. */
router.get('/update', function (req, res, next) {
  res.send('respond with a resource');
});

/* DELETE user. */
router.get('/delete', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
