import { StrictMode } from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </StrictMode>
  )
}
export default App;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [commits, setCommits] = useState(0);

//   useEffect(() => {
//     getData();
//   })


//   const getData = async () => {
//     try {
//       axios.get('http://localhost:5000/total-contributions')
//         .then(response => {
//           console.log('Current Streak:', response.data);
//           // Display the current streak value on your webpage
//         })
//         .catch(error => {
//           console.error('Error:', error.message);
//         });

//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };


//   return (
//     <div>
//       App Function

//       {/* <div className='flex flex-row items-center justify-between bg-gray-500 rounded-[3px] w-fit px-1 m-8 '>
//         <img src='/assets/icons/upwork2.png' alt='Tailwind_Icon' className="bg-white px-[1px] rounded-[2px] h-[15px] w-[15px] mr-[2px] m l-0" />
//         <p className='font-sans font-semibold text-white text-[11.5px] py-[1px] -tracking-tighter'>
//           Upwork
//         </p>
//       </div> */}


//       <p>Total Commits: 161</p>

//       <p className='mt-8'>
//         Top Languages: <br/>
//         1. JavaScript: 38.80% <br/>
//         2. HTML: 21.76% <br/>
//         3. TypeScript: 15.61% <br/>
//         4. CSS: 11.92% <br/>
//         5. SCSS: 11.88% <br/>
//       </p>


//       <p className='mt-8'>
//           Current Streak:17
//       </p>
//     </div>
//   )
// }
// export default App;