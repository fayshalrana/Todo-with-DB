import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleRegister = async(event) =>{
        event.preventDefault();
        const form = event.target;
        const username = form.name.value;
        const password = form.password.value;

        try {
            await axios.post("http://localhost:3000/login",{
          username, password  
        })
        .then((res) =>{
          form.reset()
          navigate('/home')
        })
        } catch (error) {
            navigate('/register')
        }


    }
    return (

    <div>
      <form onSubmit={handleRegister}>
      <input type="text" placeholder='name' name='name'/>
      <input type="password" placeholder='password' name='password' />
      <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login
