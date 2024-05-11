import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      <p className={styles.title}>
        Un-Authorized Page
      </p>

      <button className={styles.button}
        onClick={() => navigate('/')}>
        Go Back to Sign-In
      </button>

    </div>
  )
}
export default ErrorPage;