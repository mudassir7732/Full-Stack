import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader';
import styles from './styles';

const CheckStock = () => {
  const [data, setData] = useState();
  const [accepted, setAccepted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [image, setImage] = useState();
  const [details, setDetails] = useState();


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
    console.log(id, ' = id');
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

    if (details?.imageURL) {
      setImage('http://localhost:5000/uploads/' + details?.filename)
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
        setLoading(false);
      })
  }


  return (
    <>
      {loading && <Loader />}

      <div className={styles.container}>

        <div className={styles.firstBlock}>

          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-sans font-weight-bold">Today's Money</p>
                        <h5 className="font-weight-bolder mb-0 font-sans">
                          $53,000
                          <span className="text-success text-sm font-weight-bolder font-sans ml-1">+55%</span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i className="ni ni-money-coins text-lg opacity-5"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold font-sans">Today's Users</p>
                        <h5 className="font-weight-bolder mb-0 font-sans">
                          2,300
                          <span className="text-success text-sm font-weight-bolder font-sans ml-1">+3%</span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Sales</p>
                        <h5 className="font-weight-bolder mb-0 font-sans">
                          $103,430
                          <span className="text-success text-sm font-weight-bolder font-sans ml-1">+5%</span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          <div className={styles.dataContainer}>
            {data?.map((item, index) => (
              <div key={index} className={styles.dataList}>
                <p className={styles.itemDetails}>
                  {item.name}
                </p>
                <p className={styles.itemDetails}>
                  {item.date}
                </p>
                <button id={item.id} className={styles.viewButton} onClick={() => handleClick(item.id)}>
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {
          details &&
          <div className={styles.secondBlock}>
            <img src='/assets/icons/close.png' className={styles.closeIcon}
              onClick={() => setDetails()} />

            <div className={styles.imageInfo}>
              {/* {image && */}
              <img src='http://localhost:5000/uploads/dp round.jpg' alt="Close Icon" className='h-[120px]' />
              {/* } */}
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
            </div>

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
                    </button>
                  }

                </div>
              </div>
            }
          </div>
        }
      </div>
    </>
  )
}
export default CheckStock;
