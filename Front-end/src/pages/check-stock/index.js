import { useEffect, useState } from 'react';
import axios from 'axios';

const CheckStock = () => {
  const [data, setData] = useState();
  const [suppliers, setSuppliers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [image, setImage] = useState();
  const [details, setDetails] = useState();


  useEffect(() => {
    axios.get('http://localhost:5000/get-data')
      .then(response => {
        console.log(response.data, ' = Response')
        setData(response.data)
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/get-image')
      .then(response => {
        console.log(response.data, ' = Response2')

        setImage(response?.data[1])
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleClick = (id) => {
    console.log(id, ' = id');
    const item = data.find((item, index) => item.id === id);
    if (item) {
      setDetails(item);
    }
  };

  useEffect(() => {
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
      setImage('http://localhost:5000/uploads/'+details?.filename)
      // console.log(details, ' = Image Details');
    }
  }, [details]);

  useEffect(()=>{
    console.log(image, ' - Image')
  },[image])


  return (
    <div className='flex flex-col lg:flex-row min-h-screen items-start justify-evenly w-full bg-gray-400 shadow-lg border-[1px] border-[#e5e5e5] py-4 gap-y-6'>

      <div className='border-[1px] p-4 rounded-xl h-fit lg:min-h-[85vh] w-[85%] lg:w-[45%] bg-white'>

        <div className='flex flex-row items-center justify-between'>

          <div className='flex flex-row items-center justify-between bg-[#e9e9e9] gap-x-2 border-[1px] border-[#e0e0e0] py-2 w-fit lg:px-3'>
            <p className=' font-sans font-bold text-[18px] text-black my-auto'>
              Total
            </p>
            <p className=' font-sans font-bold text-[18px] text-black my-auto'>
              {data?.length}
            </p>
          </div>

          <div className='flex flex-row items-center justify-between bg-[#e9e9e9] gap-x-2 py-2 px-1 w-fit lg:px-3 border-[1px] border-[#e0e0e0] '>
            <p className=' font-sans font-bold text-[18px] text-black my-auto'>
              Accepted
            </p>
            <p className=' font-sans font-bold text-[18px] text-black my-auto'>
              
            </p>
          </div>

          <div className='flex flex-row items-center justify-between bg-[#e9e9e9] gap-x-2 py-2 w-fit lg:px-3 border-[1px] border-[#e0e0e0] '>
            <p className=' font-sans font-bold text-[18px] text-black my-auto'>
              Pending
            </p>
            <p className=' font-sans font-bold text-[18px] text-black my-auto'>
              0
            </p>
          </div>

        </div>

        <div className='bg-[#e9e9e9] px-3 mt-5 border-[1px] border-[#e5e5e5]'>
          {data?.map((item, index) => (
            <div key={index} className='flex flex-row items-center my-2 justify-between py-[7px] border-[1px] border-[#e5e5e5] bg-white px-3'>
              <p className='my-auto font-sans font-semibold text-black'>
                {item.name}
              </p>
              <p className='my-auto font-sans font-semibold text-black'>
                {item.date}
              </p>
              <button id={item.id} className='bg-[#006400] hover:bg-[#004400] px-[13px] py-[3px] rounded-[5px] text-white font-sans text-[13px] font-medium' onClick={() => handleClick(item.id)}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>


      <div className='border-[1px] py-3 lg:mt-0 rounded-xl px-4 min-h-[85vh] w-[85%] lg:w-[45%] bg-white'>
        {
          details &&

          <div className='flex flex-row items-center  overflow-hidden flex-wrap'>
            {/* <div className='w-[35%] bg-sky-200'> */}
              {/* {image && */}
                <img src='http://localhost:5000/uploads/dp round.jpg' alt="Close Icon" className='h-[120px]' />
              {/* } */}
            {/* </div> */}
            <div className='flex flex-col w-[65%] px-4 h-fit'>
              <p className='font-sans font-bold text-black text-[13px] h-fit min-h-[12px]'>
                {details?.name}
              </p>
              <p className='font-sans font-bold text-black text-[13px] h-fit min-h-[12px]'>
                {details?.description}
              </p>
              <p className='font-sans font-bold text-black text-[13px] h-fit min-h-[12px]'>
                {details?.date}
              </p>
              <p className='font-sans font-bold text-black text-[13px] h-fit min-h-[12px]'>
                {details?.id}
              </p>
            </div>
          </div>
        }
        <div className='bg-sky-50 min-h-[150px] w-full px-4 py-3 mt-3 border-[1px] border-sky-100'>
          <p className='bg-sky-200 w-fit px-3 py-1 border-[1px] border-[#202020] rounded-[8px] text-black font-sans font-semibold text-[16px]'>
            Suppliers URLs
          </p>
          {suppliers && videos.map((url, index) => (
            <div className='flex flex-row items-start'>
              <p className='font-semibold font-sans text-[#202020] text-[13px] mr-3'>{index + 1 + ")   "}</p>
              <a href={url} target='_blank' className='font-sans text-[14px] font-normal ' >
                {url}
              </a>
            </div>
          ))}
        </div>

        <div className='bg-sky-50 min-h-[150px] w-full px-4 py-3 mt-3 border-[1px] border-sky-100'>
          <p className='bg-sky-200 w-fit px-3 py-1 border-[1px] border-[#202020] rounded-[8px] text-black font-sans font-semibold text-[16px]'>
            Videos URLs
          </p>
          <p className='font-sans'>
            {videos && videos.map((url, index) => (
              <div className='flex flex-row items-start'>
                <p className='font-semibold font-sans text-[#202020] text-[13px] mr-3'>{index + 1 + ")   "}</p>
                <a href={url} target='_blank' className='font-sans text-[14px] font-normal ' >
                  {url}
                </a>
              </div>
            ))}

          </p>
        </div>

        <div className='flex flex-row items-center justify-end mt-3'>
          <button className='bg-[#ff0000] hover:bg-[#ee0000] mx-4 px-[13px] py-[3px] rounded-[5px] text-white font-sans font-medium' onClick={() => handleClick()}>
            Reject
          </button>

          <button className='bg-[#006400] hover:bg-[#004400] px-[13px] py-[3px] rounded-[5px] text-white font-sans font-medium' onClick={() => handleClick()}>
            Accept
          </button>

        </div>

      </div>
    </div>
  )
}
export default CheckStock;
