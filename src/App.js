// import './App.css';
// import {Routes, Route} from 'react-router-dom'
// import Register from './Pages.js/Registration'
// import Login from './Pages.js/Login';
// import Home from './Pages.js/Home';
// import PrivateRoute from './Pages.js/PrivateRoute';

// const App = () => {

//   // useEffect(() => {
//   //   const getCredential = JSON.parse(localStorage.getItem('login-credential'))

//   //   if(getCredential.length) {
//   //     Redirect( '/home')
//   //   } else {
//   //     Redirect('/login')
//   //   }

//   // }, [])

// // const [user,setUser]=useState(null);

// // const getCredential = localStorage.getItem('isLogin')

//   return (
// <>

// <div>
// <Routes>
// {/* {getCredential==='true' ? (<Route path='/home' element={<Home />} />) :
//  (
// <>
//   <Route path='/' element={<Register />} />
//   <Route path='/login' element={<Login />} />
//   <Route path='/notfound' element={<Notfound />} />
  
// </>
// )
// } */}
// <Route path='/home' element={<PrivateRoute Hello={Home} />} />
// <Route path='/home' element={<Home/>}/>
// <Route path='/' element={<Register />} />
// <Route path='/login' element={<Login/>} />
// </Routes>
// </div>


//   {/* <Route element={<ProtectedRoute isAllowed={!!user} />}></Route> */}

//    </>
//   );
// }

// export default App;


import Register from './Pages.js/Registration';
import { Routes, Route } from "react-router-dom";
import Home from  './Pages.js/Home';
import Login from './Pages.js/Login';
import PrivateRoute from "./Pages.js/PrivateRoute";


function App() {
  // const isAuthenticated=false;
  return (
    <div className="App">
      <Routes>
        <Route exact element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home/>} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Register />}></Route>

      </Routes>

    </div>
  );
}

export default App;