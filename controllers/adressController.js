const {Adress}=require('../models/models')

class AdressController{
    async create(req, res){
        const {content_adress}=req.body;
        const {adress_place}=req.body;
        const {user}=req

        console.log(content_adress)
        console.log(adress_place)
        console.log(user.id)
            
        const adress=await Adress.create({ content_adress, adress_place, userId: user.id })
        return res.json(adress)
        
    }

    async getAll(req, res){
        const adress=await Adress.findAll()
        res.send(adress)
        return adress
    }

    async delete(req, res){
        const {id_adress}=req.params
        res.send(id_adress)

        const adress=await Adress.destroy({where:{id_adress}})

        res.send(adress)
    }


    async ping(req, res){
        res.json("ping")
    }

        // // GET-маршрут для пінгування роутера
        // app.get('/ping', (req, res)=>{
        //     const routerIp = '192.168.0.1'; // IP-адреса вашого роутера
        //     ping.promise.probe(routerIp)
        //         .then((result) => {
        //             res.json({ isRouterAlive: result.alive });
        //         })
        //         .catch((error) => {
        //             res.status(500).json({ error: 'Error while pinging the router' });
        //         });
        // })

}

module.exports=new AdressController()