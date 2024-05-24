import { useEffect, useState } from "react";
import styles from "../view-products/styles";
import axios from 'axios';
import Loader from "../../components/loader";
import styles2 from '../signin/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CustomSnackbar from "../../components/snackbar";
import styles3 from '../add-product/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';


const ValidationSchema = yup.object().shape({
    name: yup.string().required('Name Required'),
    email: yup.string().email().required('Email Required'),
    password: yup.string().required('Password Required')
})

const AddUser = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [popup, setPopup] = useState(false);
    const [details, setDetails] = useState(null);

    const INTIIAL_VALUES = {
        name: details === null ? '' : details?.name,
        email: details === null ? '' : details.email,
        password: details === null ? '' : details.password,
        role: details === null ? '' : details.role === 'admin' ? true : false
    }

    useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, []);

    const getData = async () => {
        await axios.get('http://localhost:5000/get-users')
            .then(response => {
                setUsers(response?.data)
            })
            .catch(error => {
                setMessage(error?.message);
            })
            .finally(() => {
                setTimeout(() => {
                    setMessage('');
                }, 4000);
            });
    }

    const handleEditButton = (id) => {
        const item = users.find((item, index) => item.id === id);
        if (item) {
            setDetails(item);
            setPopup(true);
        }
    }

    const handleUpdate = (values) => {
        setLoading(true);
        axios
            .put(`http://localhost:5000/update/${details?.id}`, {
                name: values?.name,
                email: values?.email,
                password: values?.password,
                role: values?.role ? 'admin' : 'user',
            })
            .then((res) => {
                setMessage(res?.data?.message);
                getData();
            })
            .catch((error) => {
                setMessage(error?.message);
            })
            .finally(() => {
                setPopup(false);
                setDetails(null);
                setLoading(false);
                setTimeout(() => {
                    setMessage('');
                }, 4000);
            });
    };

    const handleDelete = (userId) => {
        setLoading(true);
        axios.delete(`http://localhost:5000/delete/${userId}`)
            .then((res) => {
                setMessage(res?.data?.message);
                getData();
            })
            .catch((error) => {
                setMessage(error?.message || 'An error occurred while deleting user');
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setMessage('');
                }, 4000);
            });
    };


    const handleSignup = (values) => {
        setLoading(true);
        axios
            .post(`http://127.0.0.1:5000/register`, {
                name: values?.name,
                email: values?.email,
                password: values?.password,
                role: values?.role ? 'admin' : 'user',
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
                getData();
                setLoading(false);
                setPopup(false);
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
                {popup === false &&
                    <div className="bg-[#eff1fa] px-6 py-4 my-4 border-[1px] border-[#e0e0e0] shadow-lg rounded-[20px]">
                        <div className='flex flex-row items-center justify-between px-2'>
                            <p className="text-[26px] font-bold font-sans text-[#000080] underline">
                                Registered Users
                            </p>

                            <button className={`bg-[#006400] hover:bg-[#004400] py-2 ${styles.buttonStyle}`}
                                onClick={() => setPopup(true)}>
                                Add New User
                            </button>
                        </div>

                        <TableContainer sx={{ borderRadius: '10px', border: '1px solid #e0e0e0', marginTop: '3vh' }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#000053' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: '#fff' }} >
                                            Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: '#fff' }} >
                                            Email
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: '#fff' }} >
                                            Role
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user, index) => (
                                        <TableRow sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                            <TableCell>
                                                {user?.name}
                                            </TableCell>
                                            <TableCell>
                                                {user?.email}
                                            </TableCell>
                                            <TableCell>
                                                {user?.role}
                                            </TableCell>
                                            <TableCell>
                                                <button id={1} className={styles.viewButton}
                                                    onClick={() => handleEditButton(user?.id)}
                                                >
                                                    Edit
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button id={1} className={`bg-[#ff0000] hover:bg-[#ee0000] ${styles.viewButton}`}
                                                    onClick={() => handleDelete(user?.id)}
                                                >
                                                    Delete
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }

                {
                    popup &&

                    <Formik initialValues={INTIIAL_VALUES} validationSchema={ValidationSchema} onSubmit={details === null ? handleSignup : handleUpdate}>
                        {({ handleChange, values, errors, touched }) => (
                            <Form>
                                <div className=' flex flex-col items-center justify-center p-4 bg-[#eff1fa] shadow-lg rounded-[18px] border-[1px]'>
                                    <div className="flex flex-row items-center justify-between w-full px-2">
                                        <p className="text-[22px] pt-2 mb-0 font-bold font-sans text-[#000080]">
                                            Add Here!
                                        </p>
                                        <img src='/assets/icons/close.png' alt='close_icon' className="h-[24px] w-[24px] cursor-pointer"
                                            onClick={() => { setPopup(false); setDetails(null) }} />
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
                                            onChange={details === null ? handleChange : undefined}
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
                                            {details === null ? 'Register' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                }

            </div>
        </>
    )
}
export default AddUser;