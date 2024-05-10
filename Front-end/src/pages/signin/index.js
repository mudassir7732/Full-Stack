import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";

const Signin = () => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userExist, setExist] = useState('');
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        let parsedUser;
        if (userString !== null) {
            parsedUser = JSON.parse(userString);
        }
        setUser(parsedUser);
    }, [])

    useEffect(() => {
        setEmail(user?.email);
        setPassword(user?.password)
    }, [user])

    const handleSignin = () => {
        setLoading(true)
        axios
            .post(`http://127.0.0.1:5000/signin`, {
                email: email,
                password: password,
            })
            .then((response) => {
                if (response?.data?.userExist === true) {
                    // if (remember) {
                        const user = JSON.stringify({ email: email, password: password })
                        localStorage.setItem('user', user)
                    // }
                    // else {
                    //     localStorage.setItem('user', null)
                    // }
                    navigate('/dashboard')
                } else {
                    setExist("User does not exist!");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setExist("User does not exist!");
            })
            .finally(() => {
                setTimeout(() => {
                    setExist('');
                }, 3000);
                setLoading(false);
            });
    }

    return (
        <>
            {loading && <Loader />}
            <div className='bg-white min-h-screen flex flex-row items-center justify-between w-full overflow-x-hidden'>
                <div className='flex flex-col items-center bg-white px-12 py-6 rounded-xl min-w-[50%] ml-20'>
                    <div>
                        <p className='text-[30px] font-bold mb-[8px] gradient-text font-sans'>
                            Welcome back
                        </p>
                        <p className='text-[#67748e] font-normal text-[16px] font-sans'>
                            Enter your email and password to sign in
                        </p>
                        <p className='text-[12px] text-[#344767] font-semibold ml-1 font-sans mt-[22px]'>
                            Email
                        </p>
                        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}
                            className='border-[1px] border-[#d0d0d0] rounded-[7px] text-[12px] h-[40px] w-[318px] my-2 px-[12px] py-[8px] outline-none font-sans' />
                        <p className='text-[12px] text-[#344767] font-semibold ml-1 mt-[8px] font-sans'>
                            Password
                        </p>
                        <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}
                            className='border-[1px] border-[#d0d0d0] rounded-[7px] text-[12px] h-[40px] w-[318px] my-2 px-[12px] py-[8px] outline-none font-sans' /><br />

                        <div className="flex flex-row items-center justify-start mt-2">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                            <p className="text-[#344767] font-normal text-[14px] ml-3 font-sans">
                                Remember me
                            </p>
                        </div>
                        <button className='text-white gradient-button outline-none mt-3 w-[318px] shadow-md my-1 hover:bg-[#000060]v font-sans'
                            style={{ borderRadius: '7px', padding: '11px 20px', fontSize: '12px', fontWeight: '600' }}
                            onClick={handleSignin}>
                            SIGN IN
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row min-w-[50vw] w-fit items-center justify-center mt-3">
                        <p className="text-[#67748e] text-[14px] font-sans">
                            Don't have an account?
                        </p>
                        <p className="ml-1 -mt-4 sm:mt-0 text-[13px] gradient-text font-medium cursor-pointer hover:text-[#63b3ed] font-sans"
                        onClick={()=>navigate('/signup')}>
                            Sign up
                        </p>
                    </div>
                    <p className="text-red-500 text-[15px] font-medium absolute bottom-24">
                        {userExist}
                    </p>
                </div>

                <img
                    alt='imag'
                    src="/assets/curved6.jpg"
                    className="h-screen w-[700px] -mr-[200px] transform -skew-x-12 rounded-bl-2xl"
                />

            </div>
        </>
    )
}
export default Signin;