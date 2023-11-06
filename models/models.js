const sequelize=require('../db')
const {DataTypes}=require('sequelize')


const User=sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING},
    surname:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defailtValue:"User"},
    city:{type:DataTypes.STRING}
})

const Comment =sequelize.define('comment',{
    id_comment:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    content:{type:DataTypes.STRING},
    data:{type:DataTypes.DATE},
    user_id:{type:DataTypes.INTEGER}
})

const ADRESS =sequelize.define('adress',{
    id_adress:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    content_adress:{type:DataTypes.INTEGER},
    statys:{type:DataTypes.BOOLEAN},
    user_id:{type:DataTypes.INTEGER}
})

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(ADRESS)
ADRESS.belongsTo(User)

module.exports={
    User,
    Comment,
    ADRESS
}