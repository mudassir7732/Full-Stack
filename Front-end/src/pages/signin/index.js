import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from "./styles";
import CustomSnackbar from "../../components/snackbar";


const Signin = () => {
    const [user, setUser] = useState();
    const [error, setError] = useState('');
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
        try {
            axios
                .post(`http://127.0.0.1:5000/signin`, {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res?.data?.user) {
                        // console.log(res.data?.user?.role, ' = data')
                        console.log(res.data?.user, ' = data')
                        if (res?.data?.user === 'not-user') {
                            setError('Email not registered')
                        }
                        else {
                            const obj = res?.data?.user;
                            
                            const user = JSON.stringify({ id: obj.id, email: obj.email, password: obj.password, token: obj.token, role: obj.role })
                            localStorage.setItem('user', user);
                            // console.log(res?.data?.user?.role, ' = Role')
                            if (res?.data?.user?.role === 'user') {
                                navigate('/dashboard');
                            }
                            else if (res?.data?.user?.role === 'admin') {
                                navigate('/update-stock');
                            }
                        }
                    }
                    else {
                        setExist("User does not exist!");
                    }
                })
                .catch((error) => {
                    localStorage.setItem('user', null)
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
        catch (err) {
            console.log(err, ' = Error')
        }
    }

    return (
        <>
            {loading && <Loader />}

            <div className={styles.container}>
                {error &&
                    <CustomSnackbar message={error} />
                }
                <div className={styles.card}>

                    <div>

                        <p className={styles.welcome}>
                            Welcome back
                        </p>

                        <p className={styles.desc}>
                            Enter your email and password to sign in
                        </p>

                        <p className={styles.title}>
                            Email
                        </p>
                        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}
                            className={styles.input} />

                        <p className={styles.title}>
                            Password
                        </p>
                        <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}
                            className={styles.input} /><br />

                        <div className={styles.switchWrapper}>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                            <p className={styles.switch}>
                                Remember me
                            </p>
                        </div>

                        <button className={styles.signin}
                            onClick={handleSignin}>
                            SIGN IN
                        </button>
                    </div>

                    <div className={styles.singupWrapper}>
                        <p className="text-[#67748e] text-[14px] font-sans">
                            Don't have an account?
                        </p>
                        <p className={styles.signup}
                            onClick={() => navigate('/signup')}>
                            Sign up
                        </p>
                    </div>

                    <p className={styles.error}>
                        {userExist}
                    </p>

                </div>

                <img
                    alt='imag'
                    src="/assets/curved6.jpg"
                    className={styles.bgImage}
                />

            </div>
        </>
    )
}
export default Signin;