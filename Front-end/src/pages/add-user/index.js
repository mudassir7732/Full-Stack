import { Form, Formik } from "formik";
import styles3 from '../add-product/styles';
import styles2 from '../signin/styles';
import axios from 'axios';
import * as yup from 'yup';
import { useState } from "react";
import Loader from "../../components/loader";
import CustomSnackbar from "../../components/snackbar";


const ValidationSchema = yup.object().shape({
    name: yup.string().required('Name Required'),
    email: yup.string().email().required('Email Required'),
    password: yup.string().required('Password Required')
})

const INTIIAL_VALUES = {
    name: '',
    email: '',
    password: '',
    role: ''
}


const AddUser = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => {
        setLoading(true);
        axios
            .post(`/routes/users/add-user`, {
                name: values?.name,
                email: values?.email,
                password: values?.password,
                role: values?.role ? 'Admin' : 'User',
            })
            .then((res) => {
                const a = res?.data?.message;
                setMessage(a);
            })
            .catch((error) => {
                localStorage.setItem('user', null)
                setMessage(error?.message);
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setMessage('');
                }, 4000);
            });
    }

    return (
        <>
            {loading && <Loader />}
            {message && <CustomSnackbar message={message} />}
            <div>
                <Formik initialValues={INTIIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleSubmit}>
                    {({ handleChange, values, errors, touched }) => (
                        <Form>
                            <div className=' flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-[18px] border-[1px]'>
                                <div className="flex flex-row items-center justify-between w-full px-2">
                                    <p className="text-[22px] pt-2 mb-0 font-bold font-sans text-[#000080]">
                                        Add Here!
                                    </p>
                                </div>
                                <div className="p-3">

                                    <p className={styles2.title}>
                                        Name
                                    </p>
                                    <input
                                        name='name'
                                        placeholder='Name'
                                        value={values.name}
                                        onChange={handleChange}
                                        className={styles2.input}
                                    />
                                    {errors.name && touched.name && (
                                        <p className={styles3.error}>
                                            {errors.name?.toString()}
                                        </p>
                                    )}

                                    <p className={styles2.title}>
                                        Email
                                    </p>
                                    <input placeholder='Email'
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        className={styles2.input} />
                                    {errors.email && touched.email && (
                                        <p className={styles3.error}>
                                            {errors.email?.toString()}
                                        </p>
                                    )}
                                    <p className={styles2.title}>
                                        Password
                                    </p>

                                    <input
                                        name='password'
                                        placeholder='Password'
                                        value={values.password}
                                        onChange={handleChange}
                                        className={styles2.input}
                                    />
                                    {errors.password && touched.password && (
                                        <p className={styles3.error}>
                                            {errors.password?.toString()}
                                        </p>
                                    )}


                                    <div className={styles2.switchWrapper}>
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
                                        <p className={styles2.switch}>
                                            Admin
                                        </p>
                                    </div>

                                    <button className={styles2.signin} type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div >
        </>
    )
}
export default AddUser;