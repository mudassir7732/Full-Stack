import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from "./styles";


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
                    const obj = response?.data?.user[0];
                    const user = JSON.stringify({ id: obj.id, email: obj.email, password: obj.password, token: obj.token, admin: obj.admin })
                    localStorage.setItem('user', user)
                    navigate('/dashboard')
                } else {
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

    return (
        <>
            {loading && <Loader />}

            <div className={styles.container}>
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