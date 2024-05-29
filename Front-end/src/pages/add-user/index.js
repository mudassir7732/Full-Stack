import { useEffect, useState } from "react";
import styles from "../view-products/styles";
import axios from 'axios';
import Loader from "../../components/loader";
import styles2 from '../signin/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CustomSnackbar from "../../components/snackbar";
import styles3 from '../add-product/styles';
import { Form, Formik } from 'formik';
import '../../App.css';
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
        role: details === null ? '' : details.role === 'Admin' ? true : false
    }

    useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, []);

    const getData = async () => {
        await axios.get('/routes/users/get-users')
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
            .put(`/routes/users/update/${details?.id}`, {
                name: values?.name,
                email: values?.email,
                password: values?.password,
                role: values?.role ? 'Admin' : 'User',
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
        axios.delete(`/routes/users/delete/${userId}`)
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
            .post(`http://localhost/register`, {
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
                    <div className="bg-white py-4 my-4 border-[1px] border-[#e9e9e9] shadow-lg rounded-[16px]">
                        <div className='flex flex-row items-center justify-between px-4'>
                            <p className="text-[18px] font-medium font-sans text-[#606060]">
                                Registered Users
                            </p>

                            <button className={`bg-[#006400] hover:bg-[#004400] py-[1px] ${styles.buttonStyle}`}
                                onClick={() => setPopup(true)}>
                                Add New User
                            </button>
                        </div>

                        <TableContainer sx={{ paddingInline:'30px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight:'500', fontSize: '12px', color: '#a9a9a9' }} >
                                            Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '500', fontSize: '12px', color: '#a9a9a9' }} >
                                            Email
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '500', fontSize: '12px', color: '#a9a9a9' }} >
                                            Role
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user, index) => (
                                        <TableRow sx={{marginInline:'200px'}} >
                                            <TableCell sx={{color:'#505050'}}>
                                                {user?.name}
                                            </TableCell>
                                            <TableCell sx={{color:'#505050'}}>
                                                {user?.email}
                                            </TableCell>
                                            <TableCell sx={{color:'#505050'}}>
                                                {user?.role}
                                            </TableCell>
                                            <TableCell>
                                                <button id={1}
                                                 className={`${styles.viewButton} button`}
                                                 style={{backgroundColor: "linear-gradient('310deg', '#17ad37', '#98ec2d')"}}
                                                    onClick={() => handleEditButton(user?.id)}
                                                >
                                                    Edit
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button id={1} className={`bg-[#ff0000] hover:bg-[#ee0000] ${styles.deleteButton}`}
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
                                <div className=' flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-[18px] border-[1px]'>
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