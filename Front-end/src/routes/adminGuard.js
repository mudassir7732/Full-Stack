import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader";
import ErrorPage from "../pages/error-page";
import CustomSnackbar from "../components/snackbar";
import {useNavigate} from 'react-router-dom';
import { AuthContext, useAuth } from "../AuthContext";

const AdminGuard = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const {isAuthenticated, userRole} = useAuth();


    console.log(userRole,' = User Role')

    // const handleAuthentication = async () => {
        // const success = await login({ email: values.email, password: values.password });
        // if (success) {
            // navigate('/dashboard')
        // }
    // }

    useEffect(() => {
        setLoading(true);
        try {
            const userString = localStorage.getItem('user');
            if (userString) {
                const user = JSON.parse(userString);
                setRole(user?.role);
            }
        }
        catch (err) {
            setMessage(err?.message)
        }
        finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {message && <CustomSnackbar message={message} />}
            {userRole === 'Admin' ? children : <ErrorPage />}
        </>
    );
};

export default AdminGuard;
