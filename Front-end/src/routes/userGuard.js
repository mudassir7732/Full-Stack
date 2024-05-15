import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ErrorPage from "../pages/error-page";

const UseGuard = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState();

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
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {role === 'user' ? children : <ErrorPage />}
        </>
    );
};

export default UseGuard;
