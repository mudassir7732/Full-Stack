import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import CustomSnackbar from '../../components/snackbar';
import Loader from '../../components/loader';
import axios from 'axios';
import styles from '../add-product/styles';
import { useNavigate } from 'react-router-dom'

const DATE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TYPE_OPTIONS = ['Expense', 'Income'];

const INITIAL_VALUES = {
  sections: [
    {
      day: '',
      month: '',
      type: '',
      amount: null,
      description: ''
    }
  ]
};

const ValidationSchema = Yup.object().shape({
  sections: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required('day is required'),
      month: Yup.string().required('Month is required'),
      type: Yup.string().required('Type is required'),
      amount: Yup.number().required('Amount is required'),
      description: Yup.string().required('Description is required')
    })
  )
});

const AddPayment = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values, ' = Values')
    const sections = values?.sections;
    // await axios.post('/routes/products/upload-data', formData)
    await axios.post('http://localhost:5000/routes/transactions/add-transaction', { sections })

      .then((res) => {
        // navigate('/products')
        console.log(res.data, ' = Response')
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

      <div className='flex flex-col items-center justify-center max-w-[95%]'>
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
                        <div key={index} className="mb-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:min-w-[650px] xl:min-w-[800px] gap-x-6">
                            <div className="col-span-1">
                              <p className={styles.title}>Select Date</p>
                              <select
                                name={`sections[${index}].day`}
                                value={section.day}
                                onChange={handleChange}
                                className='bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-full outline-none font-normal'
                              >
                                <option value="" label="Select day" />
                                {DATE_OPTIONS.map((option, i) => (
                                  <option key={i} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              {errors.sections?.[index]?.day && touched.sections?.[index]?.day && (
                                <p className={styles.error}>{errors.sections[index].day}</p>
                              )}
                            </div>

                            <div className="col-span-1">
                              <p className={styles.title}>Select Month</p>
                              <select
                                name={`sections[${index}].month`}
                                value={section.month}
                                onChange={handleChange}
                                className='bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-full outline-none font-normal'
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

                            <div className="col-span-1">
                              <p className={styles.title}>Input Type</p>
                              <select
                                name={`sections[${index}].type`}
                                value={section.type}
                                onChange={handleChange}
                                className='bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-full outline-none font-normal'
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

                            <div className="col-span-1">
                              <p className={styles.title}>Amount</p>
                              <input
                                name={`sections[${index}].amount`}
                                value={section.amount}
                                type="number"
                                placeholder="Enter amount..."
                                className='bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-full outline-none font-normal'
                                onChange={handleChange}
                              />
                              {errors.sections?.[index]?.amount && touched.sections?.[index]?.amount && (
                                <p className={styles.error}>{errors.sections[index].amount}</p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <p className={styles.title}>Description</p>
                              <textarea
                                name={`sections[${index}].description`}
                                value={section.description}
                                placeholder="Enter description..."
                                className='flex items-center bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] outline-none font-normal pt-[5px] h-[40px] w-full'
                                onChange={handleChange}
                              />
                              {errors.sections?.[index]?.description && touched.sections?.[index]?.description && (
                                <p className={styles.error}>{errors.sections[index].description}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-row flex-wrap justify-end gap-4 mt-4 mb-5">
                            {index > 0 && (
                              <button
                                type="button"
                                className="w-fit px-3 bg-[#f9f9f9] text-black outline-none font-sans py-1 rounded-[8px] font-semibold text-[16px] hover:bg-[#f0f0f0] border-[1px] border-[#808080]"
                                onClick={() => remove(index)}
                              >
                                Discard
                              </button>
                            )}
                            <button
                              type="button"
                              className="bg-[#1e90ff] w-fit px-3 text-black font-sans py-1 outline-none rounded-[8px] font-semibold text-[16px] hover:bg-[#2376ff]"
                              onClick={() =>
                                push({
                                  day: '',
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
                  <button type="submit" className={`${styles.submit} max-w-[180px] outline-none`}>
                    Save Transactions
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

export default AddPayment;
