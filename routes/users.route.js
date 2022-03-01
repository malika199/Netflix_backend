const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const productController = require('../controllers/product.controller')

// const verifyToken = require('../helpers/verifyToken');
 let id ;
// router.get('/get-user', verifyToken, userController.getUser);
// router.get('/verifytoken',verifyToken, userController.verifyToken);
router.post('/register',  userController.register);
router.post('/login', userController.login);
router.get(`/get-user/:id`,userController.getUser);
router.get('/get-users',userController.getUsers);
router.put('/update-users/:id',userController.updateUser);
router.delete('/deleteuser/:id',userController.deleteuser);
// router.put('/update-user',verifyToken, userController.updateUser);



// router.get('/getproduct', productController.getProduct);
// router.post('/createproduit', productController.insertPoduit);

module.exports = router;