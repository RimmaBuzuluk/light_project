const Router=require('express')
const router=new Router()
const commentRouner=require('./commentRouner')
const userRouter=require('./userRouter')
const adressRouter=require('./adressRouter')

router.use('/user', userRouter)
router.use('/comment', commentRouner)
router.use('/adress',  adressRouter)

module.exports=router
