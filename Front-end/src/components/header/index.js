import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    
    const handleSignout = async () => {
        try {
            localStorage.setItem('user', null);
            navigate('/');
        }
        catch (err) {
            console.log(err, ' = Error')
        }
    }

    return (
        <div className="fixed w-full z-50 min-h-[8vh] border-[1px] bg-blue-950 flex flex-row items-center justify-between px-6">
            <p className="my-auto font-sans text-white font-bold text-[22px]">
                Header
            </p>
            <button className='bg-[#006400] hover:bg-[#004400] ml-4 px-[13px] py-[3px] rounded-[5px] text-white font-sans font-medium'
                onClick={handleSignout}>
                Sign-out
            </button>
        </div>
    )
}
export default Header;