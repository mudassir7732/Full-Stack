import "../../App.css";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from "./styles";
import styles2 from '../add-product/styles';
import CustomSnackbar from "../../components/snackbar";
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    email: yup.string().email().required('Email Required'),
    password: yup.string().required('Password Required')
})

const Signin = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const getInitialValues = () => {
        const localData = localStorage.getItem("user");
        if (localData) {
            try {
                const parsedData = JSON.parse(localData);
                return parsedData ? parsedData : { email: '', password: '' };
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
                return { email: '', password: '' };
            }
        }
        return { email: '', password: '' };
    };

    const [initialValues, setInitialValues] = useState(getInitialValues);

    const handleSignin = async (values) => {
        setLoading(true)
        await axios
            .post(`/routes/auth/signin`, {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                if (remember) {
                    localStorage.setItem('user', JSON.stringify({ email: values?.email, password: values?.password }));
                }
                const a = res?.data?.message;
                setMessage(a);
                if (res?.data?.message === 'Sign-in Successful') {
                    Cookies.set('access_token', res?.data?.access_token, { expires: 1 / 24 });

                    if (res?.data?.role === 'User') {
                        navigate('/dashboard');
                    }
                    else if (res?.data?.role === 'Admin') {
                        navigate('/add-product');
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage(error?.message)

            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            });
    }


    return (
        <>
            {loading && <Loader />}
            {message &&
                <CustomSnackbar message={message} />
            }
            <div className={styles.container}>
                <div className={styles.card}>
                    <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={handleSignin}>
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

                                    <button type='submit' className={styles.signin}>
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