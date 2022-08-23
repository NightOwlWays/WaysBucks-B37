import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form,Alert } from "react-bootstrap"
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

const Login = ({ show , handleClose, switchRegister }) => {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      email: '',
      password: '',
    });
  
    const { email, password } = form;
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        // Data body
        const body = JSON.stringify(form);
  
        // Insert data for login process
        const response = await API.post('/login', body, config);
  
        // Checking process
        if (response?.status === 200) {
          // Send data to useContext
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
          });
  
          // Status check
          if (response.data.data.email === 'admin@mail.com') {
            navigate('/transaction');
          } else {
            navigate('/');
          }
  
          const alert = (
            <Alert variant="success" className="py-1">
              Login success
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Login failed
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Login</p>
                {message && message}
            </div>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="email-input ms-3">
                    <Form.Control
                        type="text"
                        id="emailInput"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        placeholder='Email'
                        autoComplete='off'
                    />
                </div>
                <div className="password-input ms-3 mt-3">
                    <Form.Control
                        type="password"
                        id="passwordInput"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        placeholder='Password'
                        autoComplete='off'
                    />
                </div>
                <div className="btn-login ms-3">
                    <button type='submit'>Login</button>
                </div>
            </Form>
            <div className="footer mt-3">
                <p className='ms-2'>
                    Don't have account ? Click <b onClick={switchRegister}>Here</b>
                </p>
            </div>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default Login