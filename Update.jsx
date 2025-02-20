import React, { useEffect, useState } from 'react'
import './Update.css'
import { Link, useNavigate , useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

export const UpdateUser = () => {

    const users={
        name:"",
        email:"",
        address:"",
    };
    const [user, setUser] = useState(users);
    const navigate=useNavigate();
    const { id } =useParams();

    const inputHandler = (e) => {
        const { name, value }=e.target;
        console.log(name,value);

        setUser({...user, [name]: value});
    };

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data);

        })
        .catch((error)=>{
            console.log(error);
        });
    },[id]);


    const submitForm =async(e)=>{
        e.preventDefault();
        await axios
        .put(`http://localhost:8000/api/update/user/${id}`, user)
        .then((response)=>{
            toast.success(response.data.message,{ position : "top-right"});
            navigate("/");
        })
        .catch((error)=>{
            console.log(error);
        
    })
}
  return (
    <div className="addUser" >
        <Link to="/" type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
        <h3>Update User Data</h3>
        <form className='adduserform' onSubmit={submitForm}>
            <div className="inputgroup">
                <label htmlFor="name"> Name:</label>
                <input
                type="text" id="name" value={user.name} onChange= {inputHandler} name="name"  autoComplete='off' placeholder='Enter your Name'>
                </input>
            </div>
            <div className="inputgroup">
                <label htmlFor="email"> Email:</label>
                <input
                type="email" id="email" value={user.email}  onChange= {inputHandler} name="email"  autoComplete='off' placeholder='Enter your Email'>
                </input>
            </div>
            <div className="inputgroup">
                <label htmlFor="address"> Address:</label>
                <input
                type="text" id="address" value={user.address}  onChange= {inputHandler} name="address"  autoComplete='off' placeholder='Enter your Address'>
                </input>
            </div>
            <div className="inputgroup">
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
    </div>
  );
};
