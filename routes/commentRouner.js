const Router=require('express')
const commentController = require('../controllers/commentController')
const authMiddleware=require("../middleware/authMiddleware")

const router=new Router()

router.post('/',authMiddleware,commentController.create)
router.get('/', commentController.getAll)

router.delete('/:id_comment',commentController.delete)


module.exports=router
