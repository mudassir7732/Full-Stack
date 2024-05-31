import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import styles from '../add-products/styles';
import Loader from '../../components/loader';
import {useNavigate} from 'react-router-dom';
import CustomSnackbar from '../../components/snackbar';


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


const Billing = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (values) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("user_file", values.image);
        formData.append("name", values.name);
        formData.append("description", values.description);

        await axios.post('/routes/products/upload-data', formData)
            .then((res) => {
                navigate('/view-products')
            })
            .catch((err) => {
                setMessage(err?.message || "Error occureds");
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

                                  
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div >
            </div>
        </>

    )
}
export default Billing;