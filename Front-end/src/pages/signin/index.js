import "../../App.css";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader";
import styles from "./styles";
import styles2 from '../add-product/styles';
import CustomSnackbar from "../../components/snackbar";
import { Form, Formik } from 'formik';
import { AuthContext } from "../../AuthContext";
import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    email: yup.string().email().required('Email Required'),
    password: yup.string().required('Password Required')
})

const Signin = () => {
    const [user, setUser] = useState();
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

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
        email: user?.email,
        password: password
    }

    const handleSignin = async (values) => {
        // try {
        setLoading(true)
        // setCredentials({email:values.email, password:values.password});
        // const success = await login({ email: values.email, password: values.password });
        // if (success) {
        //     navigate('/dashboard')
        // }
        // }
        // catch (err) {
        //     console.log(err, ' = Error')
        // }
        await axios
                .post(`/routes/auth/signin`, {
                    // .post(`http://localhost:5000/signin`, {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                const a = res?.data?.message;
                setMessage(a);
                if (res?.data?.message === 'Sign-in Successful') {
                    login();
                    const obj = res?.data?.user;
                    const user = JSON.stringify({ id: obj.id, email: obj.email, password: obj.password, token: obj.token, role: obj.role })
                    localStorage.setItem('user', user);
                    console.log(res?.data?.user?.role, ' = Role')
                    if (res?.data?.user?.role === 'User') {
                        navigate('/dashboard');
                    }
                    else if (res?.data?.user?.role === 'Admin') {
                        navigate('/add-product');
                    }
                }
            })
            .catch((error) => {
                localStorage.setItem('user', null)
                console.error('Error:', error);
                setMessage(error?.message)

            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setMessage('');
                }, 4000);
            });
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNjYyNDkwOSwiZXhwIjoxNzE2NjI4NTA5fQ.MmyL2YR9hrJ8KmNACbVINO7bqkb_ZO19TjAi04FRbrY';

    
    const fetchProtectedData = async () => {
        // const token = sessionStorage.getItem('token');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNjYyNDkwOSwiZXhwIjoxNzE2NjI4NTA5fQ.MmyL2YR9hrJ8KmNACbVINO7bqkb_ZO19TjAi04FRbrY';
        try {
            const response = await axios.get('http://localhost:5000/protected-route', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data, ' = Response')
            return response.data;
        } catch (error) {
            console.log(error, ' = Error');
            return null;
        }
    };


    return (
        <>
            {loading && <Loader />}

            <div className={styles.container}>
                {message &&
                    <CustomSnackbar message={message} />
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

                    <button onClick={fetchProtectedData} className={styles.signin}>
                        check
                    </button>

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