const ApiError=require('../error/ApiError')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

const {User, Comment, Adress}=require('../models/models')

const generateJwt=(id, email, role, name, surname, city)=>{
    return jwt.sign(
        {id, email, role, name, surname, city},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
        )
}

class UserController{
    async registration(req, res, next) {
        const {email, password, role, name, surname, city} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('ПОМИЛКА З LOGIN АБО З PASSWORD'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('КОРИСТУВАЧ З ТАКИМ ЛОГІНОМ ВЖЕ ІСНУЄ'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, name, surname, city})
        const token = generateJwt(user.id, user.email, user.role, user.name, user.surname, user.city)
        return res.json({token})
    }

    async login(req, res){
        
    }

    async check(req, res, next){
        const {id}=req.query
        if(!id){
         return   next(ApiError.badRequest('не знайден id'))
        }
        res.json(id)
    }
}

module.exports=new UserController()