const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

//routes
router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

router.post('/', blogController.blog_create_post);

module.exports = router;
