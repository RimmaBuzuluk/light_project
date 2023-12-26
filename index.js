require('dotenv').config();
const express = require('express');
const sequelize=require('./db')
const models=require('./models/models')
const cors=require('cors')
const router=require('./routes/index')
const errorHendler=require('./middleware/ErrorHandingMiddleware')
// const bodyParser=require('body-parser')

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


app.post('/',(req, res)=>{
    const { name} = req.body;

    console.log(name)
    return res.json(name)

})



start()