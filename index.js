require('dotenv').config();
const express = require('express');
const sequelize=require('./db')
const models=require('./models/models')
const cors=require('cors')
const router=require('./routes/index')
const errorHendler=require('./middleware/ErrorHandingMiddleware')

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json())
app.use(cors())
app.use('/api',router)



//обробка помилок, останній Middleware

app.use(errorHendler)
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
app.get('/',(req, res)=>{
    res.send('hello ')
})



start()