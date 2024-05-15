import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from "./styles";
import styles2 from '../update-stock/styles';
import CustomSnackbar from "../../components/snackbar";
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    email: yup.string().email().required('Email Required'),
    password: yup.string().required('Password Required')
})

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

    const INTIIAL_VALUES = {
        email:email,
        password: password
    }

    const handleSignin = async (values) => {
        setLoading(true)
        await axios
            .post(`http://127.0.0.1:5000/signin`, {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                if (res?.data?.user) {
                    if (res?.data?.user === 'not-user') {
                        setError('Email not registered')
                    }
                    else {
                        const obj = res?.data?.user;

                        const user = JSON.stringify({ id: obj.id, email: obj.email, password: obj.password, token: obj.token, role: obj.role })
                        localStorage.setItem('user', user);
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

    return (
        <>
            {loading && <Loader />}

            <div className={styles.container}>
                {error &&
                    <CustomSnackbar message={error} />
                }
                <div className={styles.card}>

                    <Formik initialValues={INTIIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleSignin}>
                        {({ handleChange, values, errors, touched }) => (
                            <Form>
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
                                    <input name='email' value={values.email} onChange={handleChange} placeholder='Email'
                                        className={styles.input} />

                                    {errors.email && touched.email && (
                                        <p className={styles2.error}>
                                            {errors.email?.toString()}
                                        </p>
                                    )}

                                    <p className={styles.title}>
                                        Password
                                    </p>
                                    <input name='password' value={values.password} onChange={handleChange} placeholder='Password'
                                        className={styles.input} />

                                    {errors.password && touched.password && (
                                        <p className={styles2.error}>
                                            {errors.password?.toString()}
                                        </p>
                                    )}

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

                                    <button type='submit' className={styles.signin}
                                        onClick={handleSignin}>
                                        SIGN IN
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>

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