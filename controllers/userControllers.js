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

    async login(req, res, next){
        const {email, password}=req.body
        const user=await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('Користувач не зареєстрований'))
        }
        let comparePassword=bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('ВКАЗАН НЕВІРНИЙ ПАРОЛЬ'))
        }

        const token =generateJwt(user.id, user.email, user.role, user.name, user.surname, user.city);
        return res.json({token})
    }

    async check(req, res, next){
        const token =generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.surname, req.user.city)
        return res.json({token})
    }
}

module.exports=new UserController()