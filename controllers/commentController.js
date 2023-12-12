const {Comment}=require('../models/models')
const ApiError=require('../error/ApiError')

class CommentController{
    async create(req, res) {
        const { content } = req.body;
        const { user } = req;

        console.log(content)
    
        try {
            const comment = await Comment.create({ content, userId: user.id });
            return res.json(comment);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Помилка при створенні коментаря' });
        }
    }

    async getAll(req, res){
        const comments =await Comment.findAll()
        res.send(comments)
        return comments
    }

  

    async delete(req, res){
        const {id_comment}=req.params
        res.send(id_comment)

        const comment =await Comment.destroy(
            {where:{id_comment}}
        )

        res.send(comment)
    }

}

module.exports=new CommentController()