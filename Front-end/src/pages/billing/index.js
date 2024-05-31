import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import CustomSnackbar from '../../components/snackbar';
import Loader from '../../components/loader';
import axios from 'axios';
import styles from '../add-products/styles';
import { useNavigate } from 'react-router-dom'

const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_OPTIONS = ['2021-01-01', '2021-02-01'];
const TYPE_OPTIONS = ['Expense', 'Income'];

const INITIAL_VALUES = {
    sections: [
        {
            date: '',
            month: '',
            type: '',
            amount: '',
            description: ''
        }
    ]
};

const ValidationSchema = Yup.object().shape({
    sections: Yup.array().of(
        Yup.object().shape({
            date: Yup.string().required('Date is required'),
            month: Yup.string().required('Month is required'),
            type: Yup.string().required('Type is required'),
            amount: Yup.number().required('Amount is required'),
            description: Yup.string().required('Description is required')
        })
    )
});

const Billing = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        console.log(values, ' = Values');
        // await axios.post('/routes/products/upload-data', formData)
        await axios.post('/routes/products/upload-data', {values})
        
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

            <div className='flex flex-col items-center justify-center'>
                <div className={styles.container}>
                    <p className={styles.heading}>Balance Sheet</p>
                    <Formik
                        initialValues={INITIAL_VALUES}
                        validationSchema={ValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, errors, touched, setFieldValue }) => (
                            <Form>
                                <FieldArray name="sections">
                                    {({ insert, remove, push }) => (
                                        <div className='flex flex-col gap-x-20'>
                                            {values.sections.map((section, index) => (
                                                <div key={index} className="section mb-3">
                                                    <div className="flex flex-row gap-x-6 flex-wrap">
                                                        <div>
                                                            <p className={styles.title}>Select Date</p>
                                                            <select
                                                                name={`sections[${index}].date`}
                                                                value={section.date}
                                                                onChange={handleChange}
                                                                className={`${styles.input} rounded-r-[5px]`}
                                                            >
                                                                <option value="" label="Select date" />
                                                                {DATE_OPTIONS.map((option, i) => (
                                                                    <option key={i} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.sections?.[index]?.date && touched.sections?.[index]?.date && (
                                                                <p className={styles.error}>{errors.sections[index].date}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className={styles.title}>Select Month</p>
                                                            <select
                                                                as="select"
                                                                name={`sections[${index}].month`}
                                                                value={section.month}
                                                                onChange={handleChange}
                                                                className={`${styles.input} rounded-r-[5px]`}
                                                            >
                                                                <option value="" label="Select month" />
                                                                {MONTH_OPTIONS.map((option, i) => (
                                                                    <option key={i} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.sections?.[index]?.month && touched.sections?.[index]?.month && (
                                                                <p className={styles.error}>{errors.sections[index].month}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className={styles.title}>Input Type</p>
                                                            <select
                                                                as="select"
                                                                name={`sections[${index}].type`}
                                                                value={section.type}
                                                                onChange={handleChange}
                                                                className={`${styles.input} rounded-r-[5px]`}
                                                            >
                                                                <option value="" label="Select type" />
                                                                {TYPE_OPTIONS.map((option, i) => (
                                                                    <option key={i} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.sections?.[index]?.type && touched.sections?.[index]?.type && (
                                                                <p className={styles.error}>{errors.sections[index].type}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row gap-x-6 mt-2">
                                                        <div>
                                                            <p className={styles.title}>Amount</p>
                                                            <input
                                                                name={`sections[${index}].amount`}
                                                                value={section.amount}
                                                                type="number"
                                                                placeholder="Enter amount..."
                                                                className={`${styles.input} rounded-r-[5px] no-arrows`}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.sections?.[index]?.amount && touched.sections?.[index]?.amount && (
                                                                <p className={styles.error}>{errors.sections[index].amount}</p>
                                                            )}
                                                        </div>

                                                        <div className="w-full">
                                                            <p className={styles.title}>Description</p>
                                                            <textarea
                                                                as="textarea"
                                                                name={`sections[${index}].description`}
                                                                value={section.description}
                                                                placeholder="Enter description..."
                                                                className={`flex items-center bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] outline-none font-normal pt-[5px] h-[40px] w-full`}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.sections?.[index]?.description && touched.sections?.[index]?.description && (
                                                                <p className={styles.error}>{errors.sections[index].description}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row justify-end gap-x-4 mt-4">
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                className="w-fit px-3 bg-[#f9f9f9] text-black outline-none font-sans py-1 rounded-[8px] font-semibold text-[16px] mb-5 hover:bg-[#f0f0f0] border-[1px] border-[#808080]"
                                                                onClick={() => remove(index)}
                                                            >
                                                                Delete Section
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="bg-[#1e90ff] w-fit px-3 text-black font-sans py-1 outline-none rounded-[8px] font-semibold text-[16px] mb-5 hover:bg-[#2376ff]"
                                                            // className="bg-[#3b82f6] w-fit px-3 text-black font-sans py-1 rounded-[8px] font-semibold text-[16px] mb-5 hover:bg-[#2376ff]"
                                                            onClick={() =>
                                                                push({
                                                                    date: '',
                                                                    month: '',
                                                                    type: '',
                                                                    amount: '',
                                                                    description: ''
                                                                })
                                                            }
                                                        >
                                                            Add Section
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>

                                <div className="flex flex-row justify-end w-full mt-4">
                                    <button type="submit" className={`${styles.submit} w-[200px] outline-none`}>
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Billing;
