import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles2 from '../add-product/styles';
import styles from '../signin/styles';
import CustomSnackbar from "../../components/snackbar";
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    name: yup.string().required('Name Required'),
    email: yup.string().email().required('Email Required'),
    password: yup.string().required('Password Required')
})

const Signup = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const INTIIAL_VALUES = {
        name: '',
        email: '',
        password: '',
        role: false
    }

    const handleSignup = (values) => {
        if (values) {
            setLoading(true);
            axios
                .post(`http://127.0.0.1:5000/register`, {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: values.role ? 'admin' : 'user',
                })
                .then((res) => {
                    const a = res?.data?.message;
                    setMessage(a);
                    if (res?.data?.message === 'Successfully Registered') {
                        const obj = res.data;
                        const user = JSON.stringify({ name: obj.name, email: obj.email, password: obj.password, role: obj.role, token: obj.token });
                        localStorage.setItem('user', user)
                        if (obj.role === 'admin') {
                            navigate('/add-products')
                        }
                        else if (obj.role === 'user') {
                            navigate('/dashboard')
                        }
                    }
                })
                .catch((error) => {
                    localStorage.setItem('user', null)
                    console.error(error, ' = Error');
                    setMessage(error?.message);
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setMessage('');
                    }, 4000);
                });
        }
    }

    return (
        <>
            {message &&
                <CustomSnackbar message={message} />
            }
            {loading && <Loader />}

            <div className={styles.container}>

                <div className={styles.card}>

                    <Formik initialValues={INTIIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleSignup}>
                        {({ handleChange, values, errors, touched }) => (
                            <Form>
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
                                    <input name='name' value={values.name} onChange={handleChange} placeholder='Name'
                                        className={styles.input} />

                                    {errors.name && touched.name && (
                                        <p className={styles2.error}>
                                            {errors.name?.toString()}
                                        </p>
                                    )}

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
                                                name='role'
                                                value={values.role}
                                                onChange={handleChange}
                                                checked={values.role}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                        <p className={styles.switch}>
                                            Admin
                                        </p>
                                    </div>

                                    <button type="submit" className={styles.signin}>
                                        SIGN UP
                                    </button>

                                </div>
                            </Form>
                        )}
                    </Formik>

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