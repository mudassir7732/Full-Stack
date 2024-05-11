import { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ProtectedRoutes=(children)=>{
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        axios.post(`http://127.0.0.1:5000/status`, {
            email: user.email, password: user.password
        })
            .then((res) => {
                // console.log(res.data?.userAdmin, ' = data');
                if(res?.data?.userAdmin === 'not-user'){
                    // navigate('/signup')
                }
                setUser(res?.data?.userAdmin);
            })
    }, [])

    useEffect(()=>{
        // console.log(typeof(user), ' = Admin' )
    },[user])

    if(user)
    return(
        children
    )
}
export default ProtectedRoutes;