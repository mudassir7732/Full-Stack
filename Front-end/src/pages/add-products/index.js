import { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './styles';
import Loader from '../../components/loader';
import CustomSnackbar from '../../components/snackbar';
import Cookies from 'js-cookie';

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

const AddProducts = () => {
  const [supplierURLs, setSupplierURLs] = useState(0);
  const [videoURLs, setVideoURLs] = useState(0);
  const [supplierURL, setSupplierURL] = useState([]);
  const [videoURL, setVideoURL] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
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
    axios.post('/routes/products/upload-data', formData)
      .then((res) => {
        navigate('/view-products')
      })
      .catch((err) => {
        setMessage(err?.message);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setMessage('');
        }, 4000);
      })
  };


  return (
    <>
      {message && <CustomSnackbar message={message} />}
      {loading && <Loader />}
      <div className='flex flex-col items-center justify-center '>
        <div className={styles.container}>
          <p className={styles.heading}>
            Content Management System
          </p>

          <Formik initialValues={INITIAL_VALUES} validationSchema={ValidationSchema} onSubmit={handleSubmit}>
            {({ handleChange, errors, touched, values, setFieldValue }) => (
              <Form>
                <div className={styles.form}>
                  <div className='flex flex-col'>

                    <p className={styles.title}>
                      Product Image
                    </p>
                    <input
                      type="file"
                      name="image"
                      className={`${styles.input} h-fit py-[4px] rounded-r-[5px]`}
                      onChange={(event) => {
                        const file = event.currentTarget.files && event.currentTarget.files[0];
                        if (file) {
                          setFieldValue('image', file);
                        }
                      }}
                    />
                    {errors.image && touched.image && (
                      <p className={styles.error}>
                        {errors.image?.toString()}
                      </p>
                    )}

                    <p className={styles.title}>
                      Product Name
                    </p>
                    <input name='name' value={values.name} placeholder='Enter name...'
                      className={`${styles.input} rounded-r-[5px]`}
                      onChange={handleChange} />
                    {errors.name && touched.name && errors.name && (
                      <p className={styles.error}>
                        {errors.name}
                      </p>
                    )}

                    <p className={styles.title}>
                      Product Description
                    </p>
                    <textarea name='description' value={values.description} placeholder='Enter description...'
                      className={`${styles.input} min-h-[80px] rounded-r-[5px]`}
                      onChange={handleChange} />
                    {errors.description && touched.description && (
                      <p className={styles.error}>
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className='flex flex-col'>

                    <p className={styles.title}>
                      Supplier URLs
                    </p>
                    <div className='flex flex-row items-center'>
                      <input
                        name='supplierURL' placeholder='Enter supplier URL...' value={values.supplierURL}
                        className={`${styles.input} max-w-[260px] rounded-r-0 `}
                        onChange={(e) => { setFieldValue('supplierURL', e.target.value); handleSupplierURLs(e.target.value, 0); }}
                      />
                      <button
                        className={styles.incrementButton}
                        type='button'
                        onClick={() => setSupplierURLs(supplierURLs + 1)}>
                        +
                      </button>
                    </div>
                    {errors.supplierURL && touched.supplierURL && (
                      <p className={styles.error}>
                        {errors.supplierURL}
                      </p>
                    )}

                    {Array.from({ length: supplierURLs }).map((_, index) => (
                      <div key={index} className='flex flex-row items-center mt-3'>
                        <input
                          placeholder='Enter supplier URL...'
                          className={`${styles.input} max-w-[260px] rounded-r-0 `}
                          onChange={(e) => handleSupplierURLs(e.target.value, index + 1)}
                        />
                        <button
                          className={styles.incrementButton}
                          onClick={() => setSupplierURLs(supplierURLs - 1)}>
                          -
                        </button>
                      </div>
                    ))}

                    <p className={styles.title}>
                      Video URLs
                    </p>
                    <div className='flex flex-row items-center'>
                      <input
                        name='videoURL' placeholder='Enter video URL...' value={values.videoURL}
                        className={`${styles.input} max-w-[260px] rounded-r-0 `}
                        onChange={(e) => { setFieldValue('videoURL', e.target.value); handleVideoURLs(e.target.value, 0); }}
                      />
                      <button
                        className={styles.incrementButton} type='button'
                        onClick={() => setVideoURLs(videoURLs + 1)}>
                        +
                      </button>
                    </div>
                    {errors.videoURL && touched.videoURL && (
                      <p className={styles.error}>
                        {errors.videoURL}
                      </p>
                    )}

                    {Array.from({ length: videoURLs }).map((_, index) => (
                      <div key={index} className='flex flex-row items-center mt-3'>
                        <input
                          placeholder='Enter video URL...'
                          className={`${styles.input} max-w-[260px] rounded-r-0 `}
                          onChange={(e) => handleVideoURLs(e.target.value, index + 1)}
                        />
                        <button
                          className={styles.incrementButton}
                          onClick={() => setVideoURLs(videoURLs - 1)}>
                          -
                        </button>
                      </div>
                    ))}

                    <button type='submit' 
                    className={styles.submit}
                    >
                      Submit
                    </button>

                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div >
      </div>
    </>

  )
}
export default AddProducts;
