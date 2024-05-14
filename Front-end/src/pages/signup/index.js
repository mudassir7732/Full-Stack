import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from '../signin/styles';
import CustomSnackbar from "../../components/snackbar";

const Signup = () => {
    const [user, setUser] = useState();
    const [error, setError] = useState('');
    const [name, setName] = useState();
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
        setName(user?.name)
        setEmail(user?.email);
        setPassword(user?.password)
    }, [user])

    const handleSignup = () => {
        setLoading(true);
        axios
            .post(`http://127.0.0.1:5000/register`, {
                name: name,
                email: email,
                password: password,
                role: admin ? 'admin' : 'user',
            })
            .then((res) => {
                if (res?.data === 'Already registered') {
                    setError('Email already registered')
                }
                else {
                    const obj = res.data;
                    const user = JSON.stringify({ name: obj.name, email: obj.email, password: obj.password, role: obj.role, token: obj.token });
                    localStorage.setItem('user', user)
                    // console.log(obj, ' = obj')
                    if (obj.role === 'admin') {
                        navigate('/update-stock')
                    }
                    else if (obj.role === 'user') {
                        navigate('/dashboard')
                    }
                }
            })
            .catch((error) => {
                localStorage.setItem('user', null)
                console.error(error, ' = Error');
                setError(error?.message);
            })
            .finally(() => {
                setLoading(false);
            });
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
                            Sign up here!
                        </p>

                        <p className={styles.desc}>
                            Enter your credentials to sign up
                        </p>

                        <p className={styles.title}>
                            Name
                        </p>
                        <input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}
                            className={styles.input} />


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