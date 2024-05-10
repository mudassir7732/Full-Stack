import { useEffect, useState } from "react";

const Home = () => {
    const user = useState(JSON.parse(localStorage.getItem('user')));
    const [name, setName] = useState();

    console.log(localStorage.getItem('token'), '  = TOken is here')

    useEffect(() => {
        if (user !== null) {
            extractUsername()
        }
    }, [])

    function extractUsername() {
        const atIndex = user?.email.indexOf('@');
        const username = user?.email.substring(0, atIndex);
        const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        setName(capitalizedUsername);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <p className="text-[32px] text-[#000080] font-bold font-sans">
                Hi {user && name}!
            </p>
            <p className="text-[32px] text-[#000080] font-bold font-sans">
                Welcome to Dashboard
            </p>
        </div>
    )
}
export default Home;