const express = require('express');
const controller = require('../controllers/userController');
const isAuth = require('../middlewares/isAuth');
const upload = require('../uploads/config');
const checkFile = require('../middlewares/checkFile') ;
const router = express.Router();

router.use(isAuth)
router.get('/' , controller.index);
router.put('/' , upload.single('avatar') , checkFile , controller.updateUser);
router.delete('/avatar' , controller.deleteAvatar)

// post route 
router.get('/post' , controller.getAllPost);
router.get('/post/:id' , controller.getPostWithId);
router.post('/post' ,upload.single('img') ,checkFile ,controller.createPost);
router.put('/post/:id' , controller.updatePost);
router.delete('/post/:id' , controller.deletePost);

module.exports = router ;