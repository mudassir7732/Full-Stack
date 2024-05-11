import { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const INITIAL_VALUES = {
  name: '',
  description: '',
  image: new Blob(),
  supplierURL: '',
  videoURL: ''
}

const ValidationSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  description: yup.string().required('Description required'),
  image: yup.mixed().test('isFile', 'Image required', value => value instanceof File).required('Image required'),
  supplierURL: yup.string().required('Supplier URL required'),
  videoURL: yup.string().required('Video URL required')
})

const UpdateStock = () => {
  const [supplierURLs, setSupplierURLs] = useState(0);
  const [videoURLs, setVideoURLs] = useState(0);
  const [data, setData] = useState();
  const [supplierURL, setSupplierURL] = useState([]);
  const [videoURL, setVideoURL] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/get-image')
      .then(response => {
        setData(response.data[1])
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  useEffect(() => {
  }, [data])

  const handleVideoURLs = (value, index) => {
    setVideoURL(prevVideoURLs => {
      const newVideoURLs = [...prevVideoURLs];
      newVideoURLs[index] = value;
      return newVideoURLs;
    });
  };

  const handleSupplierURLs = (value, index) => {
    setSupplierURL(prevSupplierURLs => {
      const newSupplierURLs = [...prevSupplierURLs];
      newSupplierURLs[index] = value;
      return newSupplierURLs
    })
  };

  const handleSubmit = async (values) => {
    let formData = new FormData();
    formData.append("user_file", values.image);
    formData.append("name", values.name);
    formData.append("description", values.description);
    supplierURL.forEach((url, index) => {
      formData.append(`supplier_url_${index}`, url);
    });
    videoURL.forEach((url, index) => {
      formData.append(`video_url_${index}`, url);
    });
    axios.post('http://localhost:5000/upload-data', formData)
      .then((res) => {
        // console.log(res, ' = Response');
        navigate('/check-stock')
      })
      .catch((err) => {
        console.log(err, ' = Error')
      })
  };


  return (
    <div className='flex flex-col items-center w-fit bg-[#eef2f8] shadow-lg rounded-[15px] border-[1px] border-[#e5e5e5] px-[38px] py-4'>

      <p className="text-[32px] text-center mb-2 underline text-[#000080] font-sans font-bold">
        Content Management System
      </p>

      {/* {data &&
        <img src={`http://localhost:5000/uploads/` + data?.filename} alt="Close Icon" className='w-[200px] h-[150px]' />
      } */}

      <div className='flex flex-col lg:flex-row gap-x-20 w-fit'>

        <Formik initialValues={INITIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleSubmit}>
          {({ handleChange, errors, touched, values, setFieldValue }) => (
            <Form>
              <div className='flex flex-col lg:flex-row gap-x-20'>
                <div className='flex flex-col'>
                  <p className="text-[14px] m-1 mt-3 text-black font-sans font-semibold">
                    Product Image
                  </p>
                  <input
                    type="file"
                    name="image"
                    className="bg-[#fefefe] outline-none px-2 font-sans text-[#303030] border-[1px] border-[#d0d0d0] rounded-[5px] h-fit py-1 w-[300px]"
                    onChange={(event) => {
                      const file = event.currentTarget.files && event.currentTarget.files[0];
                      if (file) {
                        setFieldValue('image', file);
                      }
                    }}
                  />
                  {errors.image && touched.image && (
                    <p className="text-red-500 font-sans ml-2 text-[12px] mb-0 font-semibold">
                      {errors.image?.toString()}
                    </p>
                  )}

                  <p className="text-[14px] m-1 mt-3 text-black font-sans font-semibold">
                    Product Name
                  </p>
                  <input name='name' values={values.name} placeholder='Enter name...' className="bg-[#fefefe] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] text-[#303030] h-[40px] w-[300px] outline-none font-normal" onChange={handleChange} />
                  {errors.name && touched.name && errors.name && (
                    <p className="text-red-500 font-sans ml-2 text-[12px] mb-0 font-semibold">
                      {errors.name}
                    </p>
                  )}

                  <p className="text-[14px] m-1 mt-3 text-black font-sans font-semibold">
                    Product Description
                  </p>
                  <textarea name='description' value={values.description} placeholder='Enter description...' className="bg-[#fefefe] text-[15px] px-2 font-sans border-[1px] text-[#303030] border-[#d0d0d0] rounded-[5px] h-[80px] w-[300px] outline-none font-normal" onChange={handleChange} />
                  {errors.description && touched.description && (
                    <p className="text-red-500 font-sans ml-2 text-[12px] mb-0 font-semibold">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className='flex flex-col'>
                  <p className="text-[14px] m-1 mt-3 text-black font-sans font-semibold">
                    Supplier URLs
                  </p>
                  <div className='flex flex-row items-center'>
                    <input
                      name='supplierURL' placeholder='Enter supplier URL...' value={values.supplierURL}
                      className="bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-r-0 border-[#d0d0d0] rounded-l-[5px] h-[40px] w-[260px] outline-none font-normal"
                      onChange={(e) => { setFieldValue('supplierURL', e.target.value); handleSupplierURLs(e.target.value, 0); }}

                    />

                    <button
                      className='bg-gray-600 text-white w-[40px] h-[40px] border-b-[2px] border-gray-500 rounded-r-[5px] font-extrabold text-[20px] outline-none' type='button'
                      onClick={() => setSupplierURLs(supplierURLs + 1)}>
                      +
                    </button>
                  </div>
                  {errors.supplierURL && touched.supplierURL && (
                    <p className="text-red-500 font-sans ml-2 text-[12px] mb-0 font-semibold">
                      {errors.supplierURL}
                    </p>
                  )}

                  {Array.from({ length: supplierURLs }).map((_, index) => (
                    <div key={index} className='flex flex-row items-center mt-3'>
                      <input
                        placeholder='Enter supplier URL...'
                        className="bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-r-0 border-[#d0d0d0] rounded-l-[5px] h-[40px] w-[260px] outline-none font-normal"
                        onChange={(e) => handleSupplierURLs(e.target.value, index + 1)}
                      />
                      <button
                        className='bg-gray-600 text-white w-[40px] h-[40px] border-b-[2px] border-gray-500 rounded-r-[5px] font-extrabold text-[20px] outline-none'
                        onClick={() => setSupplierURLs(supplierURLs - 1)}>
                        -
                      </button>
                    </div>
                  ))}

                  <p className="text-[14px] m-1 mt-3 text-black font-sans font-semibold">
                    video URLs
                  </p>
                  <div className='flex flex-row items-center'>
                    <input
                      name='videoURL' placeholder='Enter video URL...' value={values.videoURL}
                      className="bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-r-0 border-[#d0d0d0] rounded-l-[5px] h-[40px] w-[260px] outline-none font-normal"
                      onChange={(e) => { setFieldValue('videoURL', e.target.value); handleVideoURLs(e.target.value, 0); }}

                    />

                    <button
                      className='bg-gray-600 text-white w-[40px] h-[40px] border-b-[2px] border-gray-500 rounded-r-[5px] font-extrabold text-[20px] outline-none' type='button'
                      onClick={() => setVideoURLs(videoURLs + 1)}>
                      +
                    </button>
                  </div>
                  {errors.videoURL && touched.videoURL && (
                    <p className="text-red-500 font-sans ml-2 text-[12px] mb-0 font-semibold">
                      {errors.videoURL}
                    </p>
                  )}

                  {Array.from({ length: videoURLs }).map((_, index) => (
                    <div key={index} className='flex flex-row items-center mt-3'>
                      <input
                        placeholder='Enter video URL...'
                        className="bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-r-0 border-[#d0d0d0] rounded-l-[5px] h-[40px] w-[260px] outline-none font-normal"
                        onChange={(e) => handleVideoURLs(e.target.value, index + 1)}
                      />
                      <button
                        className='bg-gray-600 text-white w-[40px] h-[40px] border-b-[2px] border-gray-500 rounded-r-[5px] font-extrabold text-[20px] outline-none'
                        onClick={() => setVideoURLs(videoURLs - 1)}>
                        -
                      </button>
                    </div>
                  ))}

                  <button type='submit' className='bg-gray-700 w-[300px] text-white font-sans py-2 rounded-[8px] font-semibold text-[16px] mt-5 hover:bg-gray-900'>
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

      </div >
    </div >
  )
}
export default UpdateStock;
