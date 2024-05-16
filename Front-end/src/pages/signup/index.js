import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles2 from '../update-stock/styles';
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
    const [user, setUser] = useState();
    const [error, setError] = useState('');
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(false);
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

    const INTIIAL_VALUES = {
        name: name,
        email: email,
        password: password,
        role: role
    }

    const handleSignup = (values) => {
        if (values) {
            setLoading(true);
            axios
                .post(`http://127.0.0.1:5000/register`, {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: values.role ? 'role' : 'user',
                })
                .then((res) => {
                    if (res?.data === 'Already registered') {
                        setError('Email already registered')
                    }
                    else {
                        const obj = res.data;
                        const user = JSON.stringify({ name: obj.name, email: obj.email, password: obj.password, role: obj.role, token: obj.token });
                        localStorage.setItem('user', user)
                        if (obj.role === 'role') {
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
    }

    return (
        <>
            {loading && <Loader />}

            <div className={styles.container}>
                {error &&
                    <CustomSnackbar message={error} />
                }
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