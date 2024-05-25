import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ErrorPage from "../pages/error-page";
import CustomSnackbar from "../components/snackbar";
import { useAuth } from "../AuthContext";

const UseGuard = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [role, setRole] = useState();

    const { userRole } = useAuth();


    // useEffect(() => {
    //     setLoading(true);
    //     try {
    //         const userString = localStorage.getItem('user');
    //         if (userString) {
    //             const user = JSON.parse(userString);
    //             setRole(user?.role);
    //         }
    //     }
    //     catch (err) {
    //         setMessage(err?.message);
    //     }
    //     finally {
    //         setLoading(false);
    //         setTimeout(() => {
    //             setMessage('');
    //         }, 4000);
    //     }
    // }, []);

    // if (loading) {
    //     return <Loader />;
    // }

    return (
        <>
            {message && <CustomSnackbar message={message} />}
            {userRole === 'User' ? children : <ErrorPage />}
        </>
    );
};

export default UseGuard;
