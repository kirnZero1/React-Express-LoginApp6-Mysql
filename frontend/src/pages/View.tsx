import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

type tUser ={
    id:string,
    username:string,
    password:string,
    email:string,
    admin:number | string
}


const View = () => {
const [datas, setDatas] = useState<tUser>({
    id:"",
    username:"",
    password:"",
    email:"",
    admin:""
})

const { id } = useParams()
axios.defaults.withCredentials = true;

useEffect( () => {
    axios.get('http://localhost:3001/api/users/'+id)
        .then((res) => {
                setDatas(res.data[0])
        })
        .catch((err) => console.log(err.message))
}, [])
  return (
    <div className='bg-light text-dark w-100 vh-100'>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-center flex-column py-5'>
            <div><h1>User Information Data</h1></div>
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
                        <tr>
                            <td>{datas.id}</td>
                            <td>{datas.username}</td>
                            <td>{datas.password && "hashed_password"}</td>
                            <td>{datas.email}</td>
                            <td>{datas.admin ? "Admin":"User"}</td>
                            <td className='text-center'>
                                <Link className='btn btn-secondary btn-sm me-1' to={`/update/${datas.id}`}>Update</Link>
                                <Link to='/' className='btn btn-danger btn-sm'>Back</Link>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default View
