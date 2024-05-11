import "../../App.css";
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
    

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-y-12">
        <p className="text-[36px] font-sans text-[#000080] font-bold">
        Un-Authorized Page
        </p>
        <button className="bg-[#006400] hover:bg-[#004400] text-white px-4 py-2 rounded-[8px] font-sans text-[16px] font-semibold" 
        onClick={()=>navigate('/')}>
            Go Back to Sign-In
            </button>
      </div>
    )
}
export default ErrorPage;