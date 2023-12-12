const Router=require('express')
const router=new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleware=require("../middleware/authMiddleware")
const checkAuth=require("../middleware/checkAuth")


router.post('/registration',userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth',authMiddleware, userControllers.check )
router.get('/me',checkAuth,userControllers.me)


module.exports=router
