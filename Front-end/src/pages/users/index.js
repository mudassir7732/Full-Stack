import { useEffect, useState } from "react";
import styles from "../products/styles";
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

const ViewUsers = () => {
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
                }, 5000);
            });
    }

    const handleEdit = (id) => {
        const item = users.find((item, index) => item.id === id);
        if (item) {
            setDetails(item);
            // setPopup(true);
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
                }, 5000);
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
                setMessage(error?.message || 'Error occurred while deleting user');
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            });
    };


    return (
        <>
            {loading && <Loader />}
            {message && <CustomSnackbar message={message} />}
            <div>
                {details === null &&
                    <div className="bg-white py-4 px-[30px] my-4 border-[1px] border-[#e9e9e9] shadow-lg rounded-[16px]">
                        <p className=" text-[18px] font-medium font-sans text-[#606060]">
                            Registered Users
                        </p>

                        <TableContainer sx={{ paddingBlock: '0px', marginTop: '4vh', borderRadius: '10px',  overflow: 'scroll', maxWidth: '95vw',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'}}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#d1edff' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '500', fontSize: '12px', color: '#a0a0a0' }} >
                                            Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '500', fontSize: '12px', color: '#a0a0a0' }} >
                                            Email
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '500', fontSize: '12px', color: '#a0a0a0' }} >
                                            Role
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user, index) => (
                                        <TableRow sx={{ marginInline: '200px' }} >
                                            <TableCell sx={{ color: '#505050' }}>
                                                {user?.name}
                                            </TableCell>
                                            <TableCell sx={{ color: '#505050' }}>
                                                {user?.email}
                                            </TableCell>
                                            <TableCell sx={{ color: '#505050' }}>
                                                {user?.role}
                                            </TableCell>
                                            <TableCell>
                                                <button id={1}
                                                    className={`${styles.viewButton} button`}
                                                    style={{ backgroundColor: "linear-gradient('310deg', '#17ad37', '#98ec2d')" }}
                                                    onClick={() => handleEdit(user?.id)}
                                                >
                                                    Edit
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button id={1} className={`bg-[#ff0000] hover:bg-[#ee0000] ${styles.deleteButton}`}
                                                    onClick={() => handleDelete(user?.id)}
                                                >
                                                    Remove
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
                    details &&

                    <Formik initialValues={INTIIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleUpdate}>
                        {({ handleChange, values, errors, touched }) => (
                            <Form>
                                <div className=' flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-[18px] border-[1px]'>
                                    <div className="flex flex-row items-center justify-between w-full px-2">
                                        <p className="text-[22px] pt-2 mb-0 font-bold font-sans text-[#000080]">
                                            Add Here!
                                        </p>
                                        <img src='/assets/icons/close.png' alt='close_icon' className="h-[24px] w-[24px] cursor-pointer"
                                            onClick={() => setDetails(null)} />
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
                                            onChange={undefined}
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
                                            Update
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
export default ViewUsers;