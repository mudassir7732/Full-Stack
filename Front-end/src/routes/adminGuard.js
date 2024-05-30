import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminGuard = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        handleAuthentication();
    }, []);

    const handleAuthentication = async () => {
        try {
            const res = await axios.get(`/verify-token`, { withCredentials: true });
            console.log(res.data, ' = response');
            if (res?.data?.message === 'Success' && res?.data?.userRole === 'Admin') {
                return;
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            navigate('/');
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }
    return <>{children}</>;
};

export default AdminGuard;