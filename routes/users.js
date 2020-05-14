const express = require('express');
const router = express.Router();

/* curl http://localhost:3000/users */
router.get('/', function(req, res, next) {
  res.send("hello users")
});

module.exports = router;
