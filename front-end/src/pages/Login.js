import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSucess } from '../utils'

const Login = () => {
    const [loginInfo, setLogininfo] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLogininfo(copyLoginInfo);
    }

    const handlelogin = async (e) => {
        e.preventDefault();

        const {email, password } = loginInfo;

        if (!email || !password) {
            return handleError('All field are required');
        }

        try {
            const url = "https://gov-project-api.vercel.app/login";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, error, jwtToken, name } = result;
            if (success) {
                handleSucess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000);

            } else {
                if (error) {
                    const details = error?.details[0].message;
                    handleError(details);
                } else {
                    handleError(message);
                }
            }
            console.log(result);

        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container ml-auto mt-24 mb-0 mr-auto'>
            <div className='ml-auto mt-0 mb-0 mr-auto shadow-md w-96 p-8 rounded-md bg-white'>
                <h1 className='text-center text-2xl pb-2 font-bold'>Login</h1>
                <div>
                    <form className='text-center' onSubmit={handlelogin}>
                        <div className='p-2 text-left'>
                            <label htmlFor='email' className='text-sm'>Email</label>
                            <input type='email' className='border-b-2 outline-none border-black p-1 w-80 text-lg' name='email' placeholder='Enter your Email...' value={loginInfo.email} onChange={handleChange} />
                        </div >
                        <div className='p-2 text-left'>
                            <label htmlFor='password' className='text-sm'>Password</label>
                            <input type='password' className='border-b-2 outline-none border-black p-1 w-80 text-lg' name='password' placeholder='Enter your password...' value={loginInfo.password} onChange={handleChange} />
                        </div>
                        <button className='bg-sky-500 p-2 text-white text-lg rounded-lg w-80 mt-5 mb-2'>Login</button><br />
                        <span>Don't have account? &nbsp;
                            <Link to="/signup" className='text-sky-500 underline'>Signup</Link>
                        </span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
