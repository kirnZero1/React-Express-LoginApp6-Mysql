import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

type tUser ={
    id:string,
    username:string,
    password:string,
    email:string,
    admin:number | string
}


const Home = () => {
const [values, setValues] =useState<tUser[]>([])

axios.defaults.withCredentials = true;

useEffect( () => {
    axios.get('http://localhost:3001/api/users')
        .then((res) => {
                setValues(res.data)
        })
        .catch((err) => console.log(err.message))
}, [])

const handleClick = (id: string) => {
        const confirms = window.confirm('Are you sure you want to delete this user?')

        if(confirms){
            axios.delete('http://localhost:3001/api/users/delete/'+id)
                .then((res) => {
                        alert('You have successfully delete user.')
                        window.location.reload();
                })
                .catch((error) => console.log({Error: error.message}))

        }else{
            window.location.reload()
        }
}
  return (
    <div className='bg-light text-dark w-100 vh-100'>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-center flex-column py-5'>
            <div><h1>User Information Data</h1></div>
            <div>
                <div className='text-end'><Link className='btn btn-success btn-sm m-2' to='/create'>Add User</Link></div>
                <table className='table table-striped table-hover table-sm table-bordered shadow'>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((data,index) => {
                        return     <tr key={index}>
                                        <td>{data.id}</td>
                                        <td>{data.username}</td>
                                        <td>{data.password && "hashed_password"}</td>
                                        <td>{data.email}</td>
                                        <td>{data.admin ? "Admin":"User"}</td>
                                        <td className='text-center'>
                                            <Link to={`/view/${data.id}`} className='btn btn-primary btn-sm  me-1'>View</Link>
                                            <Link className='btn btn-secondary btn-sm me-1' to={`/update/${data.id}`}>Update</Link>
                                            <button onClick={() => handleClick(data.id)} className='btn btn-danger btn-sm'>Delete</button>
                                        </td>
                                    </tr>
                    })}


                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
