const express = require('express');
const router = express.Router();
const {
  create,
  getAll,
  getOne,
  update,
  deleteOne
} = require('../controllers/post');

router.route('/')
  .post(create)
  .get(getAll);

router.route('/:id')
  .get(getOne)
  .put(update)
  .delete(deleteOne);

module.exports = router;
