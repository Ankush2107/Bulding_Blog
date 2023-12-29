const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware.js');
const { GetAdmin, PostAdmin, Dashboard, AddPost, GetAddPost, EditPost, UpdateEditPost, Register, DeletePost, Logout } = require('../controllers/admin.controller.js'); 

router.get('/admin', GetAdmin);
router.post('/admin', PostAdmin);
router.get('/dashboard', authMiddleware, Dashboard)
router.get('/add-post', authMiddleware, GetAddPost);
router.post('/add-post', authMiddleware, AddPost);
router.get('/edit-post/:id', authMiddleware, EditPost);
router.put('/edit-post/:id', authMiddleware, UpdateEditPost);
router.post('/register', Register);
router.delete('/delete-post/:id', authMiddleware, DeletePost)
router.get('/logout', Logout);


module.exports = router;
