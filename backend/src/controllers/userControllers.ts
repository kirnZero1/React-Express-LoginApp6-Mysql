import {Request, Response} from 'express-serve-static-core'
import mysql from 'mysql'

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'usersdb'
})

export const getUsers = (req: Request , res: Response ) => {
        try{
            db.query('SELECT * FROM users ORDER BY id', (err, result) => {
                if(err) return res.json({Error: err.message})
                
                return res.status(200).json(result)
            })

        }catch{
            (error:any) => {return res.status(200).json({Error: error.message})} 
        }
}

export const getUser = (req: Request , res: Response ) => {
    try{

        const {id} = req.params;
        db.query('SELECT * FROM users WHERE id=?',[id], (err, result) => {
            if(err) return res.json({Error: err.message})
            
            return res.status(200).json(result)
        })

    }catch{
        (error:any) => {return res.status(200).json({Error: error.message})} 
    }
}

export const deleteUser = (req: Request , res: Response ) => {
    try{

        const {id} = req.params;
        db.query('DELETE FROM users WHERE id=?',[id], (err, result) => {
            if(err) return res.json({Error: err.message})
            
            return res.status(200).json(result)
        })

    }catch{
        (error:any) => {return res.status(200).json({Error: error.message})} 
    }
}

export const createUser = (req: Request , res: Response ) => {
    try{

        const {username, password, email, admin} = req.body;

        db.query('SELECT * FROM users WHERE username=?',[username], (err, result) => {
            if(err) return res.json({Error: err.message})

            if(result.length > 0){
                return res.json({Error: 'Username already in use'})
            }else{

                db.query('SELECT * FROM users WHERE email=?',[email], (err, result) => {
                    if(err) return res.json({Error: err.message})
        
                    if(result.length > 0){
                        return res.json({Error: 'email already in use'})
                    }else{
        
                        db.query('INSERT INTO users(username, password, email, admin) VALUES(?,?,?,?)',[username, password, email, admin], (err, result) => {
                            if(err) return res.json({Error: err.message})
                            
                            return res.status(200).json(result)
                        })

                    }
                })


            }
        })



    }catch{
        (error:any) => {return res.status(200).json({Error: error.message})} 
    }
}

export const updateUser = (req: Request , res: Response ) => {
    try{
        const {id} = req.params
        const {username, password, email, admin} = req.body;
        db.query(`UPDATE users SET username='${username}', password='${password}', email='${email}', admin='${admin}' WHERE id='${id}'`, (err, result) => {
            if(err) return res.json({Error: err.message})
            
            return res.status(200).json(result)
        })

    }catch{
        (error:any) => {return res.status(200).json({Error: error.message})} 
    }
}

module.exports = {
    getUsers, getUser, deleteUser, createUser, updateUser
}