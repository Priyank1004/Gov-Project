import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSucess } from '../utils'

const Signup = () => {
    const [signupInfo, setSignupinfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupinfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('All field are required');
        }

        try {
            const url = "https://gov-project-api.vercel.app/auth/signup";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSucess(message);
                setTimeout(() => {
                    navigate('/login')
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
                <h1 className='text-center text-2xl pb-2 font-bold'>Signup</h1>
                <div>
                    <form className='text-center' onSubmit={handleSignup}>
                        <div className='p-2 text-left'>
                            <label htmlFor='name' className='text-sm'>Name</label>
                            <input type='text' className='border-b-2 outline-none border-black p-1 w-80 text-lg' name='name' autoFocus placeholder='Enter your name...' value={signupInfo.name} onChange={handleChange} />
                        </div>
                        <div className='p-2 text-left'>
                            <label htmlFor='email' className='text-sm'>Email</label>
                            <input type='email' className='border-b-2 outline-none border-black p-1 w-80 text-lg' name='email' placeholder='Enter your Email...' value={signupInfo.email} onChange={handleChange} />
                        </div >
                        <div className='p-2 text-left'>
                            <label htmlFor='password' className='text-sm'>Password</label>
                            <input type='password' className='border-b-2 outline-none border-black p-1 w-80 text-lg' name='password' placeholder='Enter your password...' value={signupInfo.password} onChange={handleChange} />
                        </div>
                        <button className='bg-sky-500 p-2 text-white text-lg rounded-lg w-80 mt-5 mb-2'>Signup</button><br />
                        <span>Already have an account? &nbsp;
                            <Link to="/login" className='text-sky-500 underline'>Login</Link>
                        </span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup
