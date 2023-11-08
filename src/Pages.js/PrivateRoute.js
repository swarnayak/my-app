// import React, { useEffect } from 'react'
// import {useNavigate} from 'react-router-dom'
// export default function PrivateRoute(props) {
//     const {Hello}=props
//     const navigate=useNavigate();
//     useEffect(()=>{
//         let login=localStorage.getItem('IsloggedIn');
//         if(!login){
//             navigate('/home');
//         }
//     });
//   return (
//     <div>
//     <Hello/>
//     </div>
//   )
// }

import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'



export default function PrivateRoutes() {
    let  userid = localStorage.getItem("isLogin") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/login" />}
        </>

    )

}

