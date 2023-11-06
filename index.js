require('dotenv').config();
const express = require('express');
const sequelize=require('./db')
const models=require('./models/models')
const cors=require('cors')
const router=require('./routes/index')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api',router)


app.get('/', (req, res)=>{
    res.status(200).json({message:'working'})
})


const start=async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`server ${PORT} ok`);
        });
        
    }catch(e){
        console.log(e)
    }

}

// app.use(express.json())
// // const routerAddress = 'http://192.168.0.1'; // Задаємо вашу IP-адресу роутера як константу
// app.get('/',(req, res)=>{
//     res.send('hello ')
// })

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



start()