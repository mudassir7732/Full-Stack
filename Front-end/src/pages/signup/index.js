import "../../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles2 from '../add-product/styles';
import styles from '../signin/styles';
import CustomSnackbar from "../../components/snackbar";
import Cookies from 'js-cookie';
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
    }

    const handleSignup = async (values) => {
        if (values) {
            setLoading(true);
            await axios
                .post(`/routes/auth/register`, {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                })
                .then((res) => {
                    const a = res?.data?.message;
                    setMessage(a);
                    if (res?.data?.message === 'Successfully Registered') {
                        Cookies.set('access_token', res?.data?.access_token, { expires: 1 / 24 });
                        navigate('/dashboard')
                    }
                })
                .catch((error) => {
                    console.error(error, ' = Error');
                    setMessage(error?.message);
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setMessage('');
                    }, 5000);
                });
        }
    }

    return (
        <>
            {message &&
                <CustomSnackbar message={message} />
            }
            {loading && <Loader />}

            <div className={`${styles.container} z-50`}>
                    <img
                        src="/assets/curved.jpg"
                        className="z-0 h-[70vh] m-[1%] rounded-xl w-[98%] fixed top-0"
                        alt="Background"
                    />
                    <div className="absolute inset-0 overflow-auto">
                        <div className="flex items-center justify-center h-full">
                            <h1 className="text-white text-4xl font-bold">Your Text Here</h1>
                        </div>
                    </div>

                <div className={`${styles.formWrapper} z-50 mt-[30vh]`}>
                    <div className={`${styles.card} shadow-lg`}>
                        <Formik initialValues={INTIIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleSignup}>
                            {({ handleChange, values, errors, touched }) => (
                                <Form>
                                    <div className="flex flex-col w-fit items-center">
                                        <div className="flex flex-col items-start">
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

                                            <button type="submit" className={styles.signin}>
                                                SIGN UP
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <div className={styles.singupWrapper}
                        >
                            <p className="text-[#67748e] text-[14px]v font-sans">
                                Don't have an account?
                            </p>
                            <p className={styles.signup}
                                onClick={() => navigate('/')}>
                                Sign in
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;