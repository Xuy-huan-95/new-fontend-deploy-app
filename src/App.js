import './App.scss';
import NavHeader from './components/navigation/nav';
import AppRoutes from "./components/routes/AppRoutes"
import { UserContext } from "./contexApi/UserContext"
import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BallTriangle } from 'react-loader-spinner'
import { Scrollbars } from 'react-custom-scrollbars';


function App() {
  const { user } = React.useContext(UserContext);
  const [scrollbarsHeight, setScrollbarsHeight] = useState(0)

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollbarsHeight(windowHeight)
  }, [user])




  return (
    <Scrollbars autoHide style={{ height: scrollbarsHeight }}>
      <Router>
        {/* chi khi da cap nhat thong tin user thanh cong thi moi cho ung dung chay vao route neu user chua chay xong thi goi den loading  */}
        {user && user.isLoading
          ?
          <div className='loading-data-container'>
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#1877f2"
              ariaLabel="ball-triangle-loading"
              wrapperclassName={{}}
              wrapperStyle=""
              visible={true}
            />
            <div className=' loading-text'> loading ...</div>
          </div>

          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>

          </>




        }



      </Router >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Scrollbars>
  );
}

export default App;
