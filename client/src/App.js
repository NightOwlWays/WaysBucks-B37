import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { UserContext } from './context/user-context';
import './assets/css/style.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from "./pages/"
import AddProduct from './pages/admin/add-product';
import DetailProduct from './pages/customer/detail-product';
import Home from './pages/customer/home';
import AddToping from './pages/admin/add-topping';
import Profile from './pages/customer/profile';
import Cart from './pages/customer/cart';
import Transaction from './pages/admin/transaction';
import { API, setAuthToken } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.email === 'admin@mail.com') {
        navigate('/transaction');
      } else {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/transaction' element={<Transaction/>}/>
        <Route exact path='/Auth' element={<Main/>}/>
        <Route exact path='/add-product' element={<AddProduct/>}/>
        <Route exact path='/add-toping' element={<AddToping/>}/>
        <Route exact path='/detail-product/:id' element={<DetailProduct/>}/>
    </Routes>
  );
}

export default App;
