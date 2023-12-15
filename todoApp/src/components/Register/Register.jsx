import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const handleRegister = async(event) =>{
        event.preventDefault();
        const form = event.target;
        const username = form.name.value;
        const email= form.email.value;
        const password = form.password.value;

        await axios.post("http://localhost:3000/register",{
          username, email, password  
        })
        .then((res) =>{
          form.reset()
          navigate('/home')
        })


    }
    return (

    <div>
      <form onSubmit={handleRegister}>
      <input type="text" placeholder='name' name='name'/>
      <input type="email" placeholder='email' name='email'/>
      <input type="password" placeholder='password' name='password' />
      <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Register
