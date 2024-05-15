import { useEffect, useState } from "react";
import styles from "../check-stock/styles";
import axios from 'axios';
import Loader from "../../components/loader";
import styles2 from '../signin/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CustomSnackbar from "../../components/snackbar";

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [details, setDetails] = useState(null);

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
                console.error('Error fetching images:', error);
            });
    }

    const handleEditButton = (id) => {
        const item = users.find((item, index) => item.id === id);
        if (item) {
            setDetails(item);
        }
    }

    useEffect(() => {
        console.log(details, ' = details')
    }, [details])

    const handleSubmit = () => {
        setLoading(true);
        axios
            .put(`http://localhost:5000/update/${details?.id}`, {
                name: details?.name,
                email: details?.email,
                password: details?.password,
                role: details?.role,
            })
            .then((res) => {
                console.log(res.data, ' = Data')
                setError('Successfully Updated');
                getData();
            })
            .catch((error) => {
                localStorage.setItem('user', null);
                console.error(error, ' = Error');
                setError(error?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (userId) => {
        setLoading(true);
        axios.delete(`http://localhost:5000/delete/${userId}`)
            .then((response) => {
                console.log(response.data, ' = Response');
                setError('User deleted successfully');
                getData();
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                setError(error?.response?.data?.message || 'An error occurred while deleting user');
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleSignup = () => {
        setLoading(true);
        axios
            .post(`http://127.0.0.1:5000/register`, {
                name: name,
                email: email,
                password: password,
                role: role ? 'role' : 'user',
            })
            .then((res) => {
                if (res?.users === 'Already registered') {
                    setError('Email already registered')
                }
                else {
                    setError('Successfully Added')
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

    return (
        <>
            {loading && <Loader />}
            {error && <CustomSnackbar message={error} />}
            <div>
                {details === null &&
                    <div className="bg-[#eff1fa] px-6 py-4 my-4 border-[1px] border-[#e0e0e0] shadow-lg rounded-[20px]">
                        <div className='flex flex-row items-center justify-between px-2'>
                            <p className="text-[26px] font-bold font-sans text-[#000080] underline">
                                Registered Users
                            </p>

                            <button className={`bg-[#006400] hover:bg-[#004400] py-2 ${styles.buttonStyle}`}
                                onClick={() => setDetails(null)}>
                                Add New User
                            </button>
                        </div>


                        <TableContainer sx={{ borderRadius: '10px', border: '1px solid #e0e0e0', marginTop: '3vh' }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#000080' }}>
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
                    details !== null &&
                    <div className=' flex flex-col items-center justify-center p-4 bg-[#eff1fa] shadow-lg rounded-[18px] border-[1px]'>
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
                                placeholder='Name'
                                onChange={(e) =>
                                    details === null ? setName(e.target.value) : setDetails({ ...details, name: e.target.value })
                                }
                                value={details === null ? password : details.name}
                                className={styles2.input}
                            /><br />

                            <p className={styles2.title}>
                                Email
                            </p>
                            <input placeholder='Email' onChange={(e) => details === null ? setEmail(e.target.value) : details.password = e.target.value}
                                value={details === null ? email : details.email} className={styles2.input} />

                            <p className={styles2.title}>
                                Password
                            </p>

                            <input
                                placeholder='Password'
                                onChange={(e) =>
                                    details === null ? setPassword(e.target.value) : setDetails({ ...details, password: e.target.value })
                                }
                                value={details === null ? password : details.password}
                                className={styles2.input}
                            /><br />

                            <div className={styles2.switchWrapper}>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={details === null ? role : details.role === 'admin' ? true : false}
                                        onChange={(e) => {
                                            details === null
                                                ? setRole(e.target.checked)
                                                : setDetails({ ...details, role: e.target.checked ? 'admin' : 'user' });
                                        }}
                                    />

                                    <span className="slider"></span>
                                </label>
                                <p className={styles2.switch}>
                                    Admin
                                </p>
                            </div>

                            <button className={styles2.signin}
                                onClick={details === null ? handleSignup : handleSubmit}>
                                {details === null ? 'Sign Up' : 'Submit'}
                            </button>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
export default AddUser;