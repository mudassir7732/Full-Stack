import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      <p className={styles.title}>
        Something Went Wrong!
      </p>
      <p className='font-sans'>
        The page you are looking for is not found!
      </p>

      <button className={styles.button}
        onClick={() => navigate('/')}>
        Back to Sign-in
      </button>

    </div>
  )
}
export default ErrorPage;