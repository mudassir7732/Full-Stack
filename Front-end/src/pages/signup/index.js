import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from '../signin/styles';

const Signup = () => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(false);
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

    const handleSignup = () => {
        setLoading(true);
        let val = admin === true ? '1' : '0'
        console.log(val, ' = Value')
        axios
            .post(`http://127.0.0.1:5000/register`, {
                email: email,
                password: password,
                admin: val
            })
            .then((response) => {
                if (response.data.token) {
                    const token = response.data.token;;
                    localStorage.setItem('token', token)
                    const user = JSON.stringify({ email: email, password: password })
                    localStorage.setItem('user', user)
                    console.log(response, ' = response')
                    navigate('/dashboard')
                }
            })
            .catch((error) => {
                localStorage.setItem('user', null)
                console.error('Error:', error);
            })
            .finally(() => {
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
                            Welcome. Sign up here!
                        </p>

                        <p className={styles.desc}>
                            Enter your email and password to sign up
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
                                    checked={admin}
                                    onChange={(e) => setAdmin(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                            <p className={styles.switch}>
                                Admin
                            </p>
                        </div>

                        <button className={styles.signin}
                            onClick={handleSignup}>
                            SIGN UP
                        </button>

                    </div>

                    <div className={styles.singupWrapper}>
                        <p className="text-[#67748e] text-[14px]v font-sans">
                            Don't have an account?
                        </p>
                        <p className={styles.signup}
                            onClick={() => navigate('/')}>
                            Sign in
                        </p>
                    </div>

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
export default Signup;