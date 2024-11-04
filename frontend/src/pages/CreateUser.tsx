import React,{useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

type tUserCreate ={
    username: string,
    password:string,
    email:string,
    admin:string
}

const CreateUser = () => {
    const [cdata, setCdata] = useState<tUserCreate>({
        username:"",
        password:"",
        email:"",
        admin:""
    })

axios.defaults.withCredentials = true;
const navigate = useNavigate();


const handleSubmit: React.FormEventHandler<HTMLFormElement>  = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/users/create',cdata)
            .then((res) => {
                    alert('You have successfully created a user. You will be send to homepage')
                    navigate('/')
            })
            .catch((error) => console.log({Error: error.message}))
}

  return (
    <div className='bg-light text-dark w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div className='container'>
                <div className='text-center'>
                     <h1>Create User Information</h1>
                </div>
                
                        <form onSubmit={handleSubmit}>
                            <div className='col-12 d-flex align-items-center justify-content-center'>
                                    <div className='col-6'>
                                        <div className='row '>
                                            <div className='col-3 border'>
                                                Username :
                                            </div>
                                            <div className='col-9 '>
                                                <input className='form-control'  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCdata({...cdata, username: event.target.value})} required/>
                                            </div>
                                        </div>
                                        <div className='row my-2'>
                                            <div className='col-3 border'>
                                                Password :
                                            </div>
                                            <div className='col-9 '>
                                                <input className='form-control'  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCdata({...cdata, password: event.target.value})} required />
                                            </div>
                                        </div>
                                        <div className='row my-2'>
                                            <div className='col-3 border'>
                                                Email :
                                            </div>
                                            <div className='col-9 '>
                                                <input className='form-control' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCdata({...cdata, email: event.target.value})} required/>
                                            </div>
                                        </div>
                                        <div className='row my-2'>
                                            <div className='col-3 border'>
                                                Admin :
                                            </div>
                                            <div className='col-9 '>
                                                <div className='col-6'>
                                                    <select className='form-select' onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setCdata({...cdata, admin: event.target.value})} required>
                                                    <option></option>
                                                    <option value='1'>true</option>
                                                    <option value='0'>false</option>
                                                </select>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div className='row '>
                                            <div className='col-12 text-center py-2'>
                                                <input type='submit' placeholder='Submit' className='btn btn-success px-5 p-1 me-2' />
                                                <Link to='/' className='btn btn-danger p-1 px-5'>Back</Link>
                                            </div>
                                        </div>
                    
                                    </div>
                                
                            </div>
                        </form>
                
   
        </div>
    </div>
  )
}

export default CreateUser
