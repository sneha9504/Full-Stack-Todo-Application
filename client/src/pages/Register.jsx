import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: "POST",
      headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    alert(data);
    
    if(response.ok){
      window.location.href="/login";
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username' value={userData.username} onChange={handleChange}/>
        <br />
        <input type="email" placeholder='email' name='email' value={userData.email} onChange={handleChange}/>
        <br />
        <input type="password" placeholder='password' name='password' value={userData.password} onChange={handleChange}/>
        <br/>
        <button type='submit'>Register</button>
        <br />
        <small>Already have an account then <Link to='/login'>Login</Link></small>
      </form>
    </section>
  )
}

export default Register