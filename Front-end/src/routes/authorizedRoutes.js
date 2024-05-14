import { useEffect } from "react";
import ErrorPage from "../pages/error-page";

const AuthorizedRoutes = ({ children }) => {
    let admin = null;

    useEffect(() => {
        try {
            const userString = localStorage.getItem('user');
                let user = null;
                if (userString !== null) {
                    user = JSON.parse(userString);
                }
                admin = user?.admin;
                console.log(admin,' = Admin')
        }
        catch (err) {
            console.log(err, ' = Error')
        }
    }, [])

    // if (admin === 0) {
        return children
    // }
    // else {
        // return <ErrorPage />
    // }
}
export default AuthorizedRoutes;