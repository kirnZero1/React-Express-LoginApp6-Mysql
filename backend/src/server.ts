import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql'
dotenv.config();
import cors from 'cors'
import {usersRoute} from './route/userRoute'

const app = express();

const db  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'usersdb'
})

app.use(cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','DELETE','PATCH','PUT'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', usersRoute)

db.connect((err) => {
    if(err) throw err;
    app.listen(process.env.PORT, () => {
        console.log('Database and Server is now online at PORT '+process.env.PORT)
    })
})
