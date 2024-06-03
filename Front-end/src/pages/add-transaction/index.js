import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import CustomSnackbar from '../../components/snackbar';
import Loader from '../../components/loader';
import axios from 'axios';
import styles2 from '../add-product/styles';
import { useNavigate } from 'react-router-dom'
import { DATE_OPTIONS, MONTH_OPTIONS, TYPE_OPTIONS } from '../../constants';
import styles from './styles';


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
    await axios.post('routes/transactions/add-transaction', { sections })

      .then((res) => {
        console.log(res.data, ' = Response')
      })
      .catch((err) => {
        setMessage(err?.message || "Error occureds");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
  };

  return (
    <>
      {message && <CustomSnackbar message={message} />}
      {loading && <Loader />}

      <div className='flex flex-col items-center justify-center max-w-[95%]'>
        <div className={styles2.container}>
          <p className={styles2.heading}>Add Here!</p>
          
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, errors, touched }) => (

              <Form>
                <FieldArray name="sections">
                  {({ remove, push }) => (
                    <div className='flex flex-col gap-x-20'>
                      {values.sections.map((section, index) => (
                        <div key={index}>
                          <div className={styles.inputsWrapper}>
                            <div className="col-span-1">
                              <p className={styles2.title}>Select Date</p>
                              <select
                                name={`sections[${index}].day`}
                                value={section.day}
                                onChange={handleChange}
                                className={styles.input}
                              >
                                <option value="" label="Select day" />
                                {DATE_OPTIONS.map((option, i) => (
                                  <option key={i} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              {errors.sections?.[index]?.day && touched.sections?.[index]?.day && (
                                <p className={styles2.error}>{errors.sections[index].day}</p>
                              )}
                            </div>

                            <div className="col-span-1">
                              <p className={styles2.title}>Select Month</p>
                              <select
                                name={`sections[${index}].month`}
                                value={section.month}
                                onChange={handleChange}
                                className={styles.input}
                              >
                                <option value="" label="Select month" />
                                {MONTH_OPTIONS.map((option, i) => (
                                  <option key={i} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              {errors.sections?.[index]?.month && touched.sections?.[index]?.month && (
                                <p className={styles2.error}>{errors.sections[index].month}</p>
                              )}
                            </div>

                            <div className="col-span-1">
                              <p className={styles2.title}>Input Type</p>
                              <select
                                name={`sections[${index}].type`}
                                value={section.type}
                                onChange={handleChange}
                                className={styles.input}
                              >
                                <option value="" label="Select type" />
                                {TYPE_OPTIONS.map((option, i) => (
                                  <option key={i} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              {errors.sections?.[index]?.type && touched.sections?.[index]?.type && (
                                <p className={styles2.error}>{errors.sections[index].type}</p>
                              )}
                            </div>

                            <div className="col-span-1">
                              <p className={styles2.title}>Amount</p>
                              <input
                                name={`sections[${index}].amount`}
                                value={section.amount}
                                type="number"
                                placeholder="Enter amount..."
                                className={styles.input}
                                onChange={handleChange}
                              />
                              {errors.sections?.[index]?.amount && touched.sections?.[index]?.amount && (
                                <p className={styles2.error}>{errors.sections[index].amount}</p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <p className={styles2.title}>Description</p>
                              <textarea
                                name={`sections[${index}].description`}
                                value={section.description}
                                placeholder="Enter description..."
                                className={styles.desc}
                                onChange={handleChange}
                              />
                              {errors.sections?.[index]?.description && touched.sections?.[index]?.description && (
                                <p className={styles2.error}>{errors.sections[index].description}</p>
                              )}
                            </div>
                          </div>

                          <div className={styles.buttonsWrapper}>
                            {index > 0 && (
                              <button
                                type="button"
                                className={styles.discardButton}
                                onClick={() => remove(index)}
                              >
                                Discard
                              </button>
                            )}
                            <button
                              type="button"
                              className={styles.addButton}
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

                <div className="flex flex-row justify-end w-full">
                  <button type="submit" 
                  className={`${styles2.submit} max-w-[180px] outline-none`}>
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
