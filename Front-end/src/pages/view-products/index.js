import { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import Loader from '../../components/loader';
import styles from './styles';

const ViewProducts = () => {
  const [data, setData] = useState();
  const [accepted, setAccepted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  const getData = async () => {
    await axios.get('http://localhost:5000/get-data')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }

  useEffect(() => {
    if (data) {
      console.log(data, ' = Data')
      let rejectedCounter = 0;
      let acceptedCounter = 0;
      data.map((item) => {
        if (item.status === 'Rejected') {
          rejectedCounter = rejectedCounter + 1;
        }
        else if (item.status === 'Accepted') {
          acceptedCounter = acceptedCounter + 1;
        }
        return null;
      })
      setRejected(rejectedCounter);
      setAccepted(acceptedCounter);
    }
  }, [data])

  const handleClick = (id) => {
    const item = data.find((item, index) => item.id === id);
    if (item) {
      setDetails(item);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (details?.supplierURLs) {
      try {
        setSuppliers(JSON.parse(details.supplierURLs));
      } catch (error) {
        console.error("Error parsing supplier URLs:", error);
      }
    }

    if (details?.videoURLs) {
      try {
        setVideos(JSON.parse(details.videoURLs));
      } catch (error) {
        console.error("Error parsing video URLs:", error);
      }
    }
    setLoading(false);
  }, [details]);

  const updateStatus = async (id, status) => {
    setLoading(true);
    axios.post('http://localhost:5000/update-status', { id: id, newStatus: status })
      .then((res) => {
        console.log(res, ' = Result')
        getData();
      })
      .catch((err) => {
        console.log(err, ' = Error')
      })
      .finally(() => {
        setDetails(null);
        setLoading(false);
      })
  }

  return (
    <>
      {loading && <Loader />}

      <div className='flex items-center h-fit justify-center w-fit py-4 '>
        <div className={`${details === null ? 'mt-0' : 'mt-8'}`}>

          {details === null &&
            <div className="bg-[#eff1fa] border-[1px] p-5 border-[#e0e0e0] shadow-lg rounded-[20px]">
              <div className={styles.header}>

                <div className={styles.headingBox}>
                  <p className={styles.headingTitle}>
                    Total
                  </p>
                  <p className={styles.headingTitle}>
                    {data?.length}
                  </p>
                </div>

                <div className={styles.headingBox}>
                  <p className={styles.headingTitle}>
                    Accepted
                  </p>
                  <p className={styles.headingTitle}>
                    {accepted}
                  </p>
                </div>

                <div className={styles.headingBox}>
                  <p className={styles.headingTitle}>
                    Rejected
                  </p>
                  <p className={styles.headingTitle}>
                    {rejected}
                  </p>
                </div>

              </div>

              <TableContainer sx={{ borderRadius: '10px', border: '1px solid #e0e0e0', marginTop: '3vh' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#000080' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: '#fff' }} >
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: '#fff' }} >
                        Date
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((item, index) => (
                      <TableRow sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                        <TableCell>
                          {item?.name}
                        </TableCell>
                        <TableCell>
                          {item?.date}
                        </TableCell>
                        <TableCell>
                          <button id={1} className={styles.viewButton}
                            onClick={() => handleClick(item?.id)}
                          >
                            View
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }

          {
            details !== null &&
            <>
              <div className="bg-[#eff1fa] px-5 w-full border-[1px] border-[#e0e0e0] shadow-lg rounded-[20px]">

                <img src='/assets/icons/close.png' alt='close_icon'
                  className='h-[22px] w-[22px] cursor-pointer ml-[100%] mt-4'
                  onClick={() => setDetails(null)}
                />

                <dviv className={styles.imageInfo}>
                  <img src={`http://localhost:5000/uploads/${details?.filename}`} alt="Close Icon" className='h-[120px]' />
                  <div className={styles.infoWrapper}>
                    <p className={styles.itemInfo}>
                      {details?.name}
                    </p>
                    <p className={styles.itemInfo}>
                      {details?.description}
                    </p>
                    <p className={styles.itemInfo}>
                      {details?.date}
                    </p>
                    <p className={styles.itemInfo}>
                      {details?.id}
                    </p>
                  </div>
                </dviv>

                <div className={styles.URLsBlock}>
                  <p className={styles.URLsTitle}>
                    Suppliers URLs
                  </p>
                  {suppliers && suppliers.map((url, index) => (
                    <div className={styles.URLsWrapper}>
                      <p className={styles.URLIndex}>{index + 1 + ")   "}</p>
                      <a href={url} target='_blank' className={styles.URL} >
                        {url}
                      </a>
                    </div>
                  ))}
                </div>

                <div className={styles.URLsBlock}>
                  <p className={styles.URLsTitle}>
                    Videos URLs
                  </p>
                  <p className='font-sans'>
                    {videos && videos.map((url, index) => (
                      <div className={styles.URLsWrapper}>
                        <p className={styles.URLIndex}>{index + 1 + ")   "}</p>
                        <a href={url} target='_blank' className={styles.URL} >
                          {url}
                        </a>
                      </div>
                    ))}
                  </p>
                </div>

                {
                  details &&
                  <div className={styles.buttonsWrapper}>
                    <div className={styles.status}>
                      Status:
                      <p className={styles.statusVal}>
                        {details?.status}
                      </p>
                    </div>
                    <div>
                      {(details.status === 'Accepted' || details.status === 'Pending') &&
                        <button className={`bg-[#ff0000] hover:bg-[#ee0000] ${styles.buttonStyle}`}
                          onClick={() => updateStatus(details.id, 'Rejected')}>
                          Reject
                        </button>
                      }
                      {details.status !== 'Accepted' &&
                        <button className={`bg-[#006400] hover:bg-[#004400] ml-4 ${styles.buttonStyle}`}
                          onClick={() => updateStatus(details.id, 'Accepted')}>
                          Accept
                        </button>}

                    </div>
                  </div>
                }
              </div>
              <div className='h-6' />
            </>
          }
        </div>
      </div>
    </>
  )
}
export default ViewProducts;
