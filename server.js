import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/auth/', authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})