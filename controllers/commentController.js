const {Comment}=require('../models/models')
const ApiError=require('../error/ApiError')

class CommentController{
    async create(req, res){
        const {content}=req.body
        const comment=await Comment.create({content})
    }

    async getAll(req, res){
    }

    async getOne(req, res){
        
    }

    async delete(req, res){
        
    }

}

module.exports=new CommentController()