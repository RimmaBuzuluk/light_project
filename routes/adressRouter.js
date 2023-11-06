const Router=require('express')
const AdressController = require('../controllers/adressController')
const adressController = require('../controllers/adressController')

const router=new Router()

router.get('/', adressController.getOne)
router.get('/', adressController.getAll)
router.delete('/',adressController.delete)


module.exports=router