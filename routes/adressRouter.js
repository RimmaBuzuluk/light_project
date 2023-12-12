const Router=require('express')
const AdressController = require('../controllers/adressController')
const adressController = require('../controllers/adressController')
const authMiddleware=require("../middleware/authMiddleware")

const router=new Router()

router.post('/', authMiddleware, adressController.create)
router.get('/', adressController.getAll)
router.delete('/:id_adress',adressController.delete)
router.get('/ping', adressController.ping)


module.exports=router