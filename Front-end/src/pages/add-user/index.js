import { useEffect, useState } from "react";
import styles from "../check-stock/styles";
import axios from 'axios';
import Loader from "../../components/loader";

const AddUser = () => {
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [details, setDetails] = useState(null);


    useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
    }, []);

    const getData = async () => {
        await axios.get('http://localhost:5000/get-users')
            .then(response => {
                setData(response?.data)
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }

    useEffect(() => {
        console.log(data, ' = dataaaaa')
    }, [data])


    const handleClick = (id) => {
        console.log(id, ' = id');
        const item = data.find((item, index) => item.id === id);
        if (item) {
            setDetails(item);
        }
    };


    return (
        <>
            {loading && <Loader />}
            <div className={styles.container}>

                <div className={styles.firstBlock}>
                    <div className='flex flex-row justify-end px-2'>
                        <button className={`bg-[#006400] hover:bg-[#004400] ml-4 ${styles.buttonStyle}`} onClick={()=>setPopup(true)}>
                            Add New User
                        </button>
                    </div>

                    <div className={styles.dataContainer}>
                        {data?.map((item, index) => (
                            <div key={1} className={styles.dataList}>
                                <p className={styles.itemDetails}>
                                    {/* {item.name} */}
                                </p>
                                <p className={styles.itemDetails}>
                                    {/* {item.date} */}
                                </p>
                                <button id={1} className={styles.viewButton}
                                    onClick={() => handleClick(1)}
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {
                    popup &&
                    <div className={styles.secondBlock}>
                        <img src='/assets/icons/close.png' className={styles.closeIcon}
                            onClick={() => setDetails()}
                        />

                        <div className={styles.imageInfo}>
                            <img src={`http://localhost:5000/uploads/${details?.filename}`} alt="Close Icon" className='h-[120px]' />
                            <div className={styles.infoWrapper}>
                                <p className={styles.itemInfo}>
                                    {/* {details?.name} */}
                                </p>
                                <p className={styles.itemInfo}>
                                    {/* {details?.description} */}
                                </p>
                                <p className={styles.itemInfo}>
                                    {/* {details?.date} */}
                                </p>
                                <p className={styles.itemInfo}>
                                    {/* {details?.id} */}
                                </p>
                            </div>
                        </div>

                        <div className={styles.URLsBlock}>
                            <p className={styles.URLsTitle}>
                                Suppliers URLs
                            </p>
                            {/* {suppliers && suppliers.map((url, index) => ( */}
                            <div className={styles.URLsWrapper}>
                                <p className={styles.URLIndex}>{1 + ")   "}</p>
                                <a href={'abx'} target='_blank' className={styles.URL} >
                                    {/* {url} */}
                                </a>
                            </div>
                            {/* ))} */}
                        </div>

                        <div className={styles.URLsBlock}>
                            <p className={styles.URLsTitle}>
                                Videos URLs
                            </p>
                            <p className='font-sans'>
                                {/* {videos && videos.map((url, index) => ( */}
                                <div className={styles.URLsWrapper}>
                                    <p className={styles.URLIndex}>{1 + ")   "}</p>
                                    <a href={'sdg'} target='_blank' className={styles.URL} >
                                        {/* {url} */}
                                    </a>
                                </div>
                                {/* ))} */}
                            </p>
                        </div>

                        {
                            details &&
                            <div className={styles.buttonsWrapper}>
                                <div className={styles.status}>
                                    Status:
                                    <p className={styles.statusVal}>
                                        {/* {details?.status} */}
                                    </p>
                                </div>
                                <div>
                                    {/* {(details.status === 'Accepted' || details.status === 'Pending') && */}
                                    <button className={`bg-[#ff0000] hover:bg-[#ee0000] ${styles.buttonStyle}`}
                                    //   onClick={() => updateStatus(details.id, 'Rejected')}
                                    >
                                        Reject
                                    </button>
                                    {/* } */}

                                    {/* {details.status !== 'Accepted' && */}
                                    <button className={`bg-[#006400] hover:bg-[#004400] ml-4 ${styles.buttonStyle}`}
                                    //   onClick={() => updateStatus(details.id, 'Accepted')}
                                    >
                                        Accept
                                    </button>
                                    {/* } */}

                                </div>
                            </div>
                        }
                    </div>
                }

            </div>
        </>
    )
}
export default AddUser;