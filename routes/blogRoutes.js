const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

//routes
router.get('/', requireAuth, blogController.blog_index);

router.get('/create', requireAuth, blogController.blog_create_get);

router.get('/:id', requireAuth, blogController.blog_details);

router.delete('/:id', requireAuth, blogController.blog_delete);

router.post('/', requireAuth, blogController.blog_create_post);

module.exports = router;
