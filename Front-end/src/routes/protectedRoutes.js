const { useEffect } = require("react");


const ProtectedRoutes=({children})=>{

    
    useEffect(() => {
        try {
            const userString = localStorage.getItem('user');
            let user = null;
            if (userString !== null) {
                user = JSON.parse(userString);
            }
            console.log(user.admin,' = User')

        //     axios.post(`http://127.0.0.1:5000/signin`, {
        //         email: user.email, password: user.password
        //     })
        //         .then((res) => {
        //             console.log(res.data?.user?.admin, ' = data');
        //             setUser(res?.data?.user);
        //         })
        //         .catch((err) => {
        //             setUser(0)
        //         })
        }
        catch (err) {
            console.log(err, ' = Error')
        }
        return(
            {children}
        )

    }, [])
}
export default ProtectedRoutes;