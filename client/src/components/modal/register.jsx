import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form,Alert } from "react-bootstrap"
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

const Register = ({ show, handleClose, switchLogin }) => {

    const [ state, dispatch ] = useContext(UserContext)
    console.log(state);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    address: '',
    postcode: '',
    email: '',
    password: '',
  });

  const { fullname,address,postcode, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);

      // Notification
      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullname: '',
          address: '',
          postcode: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="success" className="py-1">
            Success register
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
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
                <p className='mt-4 ms-3'>Register</p>
                {message && message}
            </div>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="email-input ms-3">
                <Form.Control
                    type="text"
                    id="emailInput"
                    value={email}
                    name="email"
                    placeholder='Email'
                    autoComplete='off'
                    onChange={handleChange}
                />
            </div>
            <div className="password-input ms-3 mt-3">
                <Form.Control
                    type="password"
                    id="passwordInput"
                    value={password}
                    name="password"
                    placeholder='Password'
                    autoComplete='off'
                    onChange={handleChange}
                />
            </div>
            <div className="fullname-input ms-3 mt-3">
                <Form.Control
                    type="text"
                    id="fullnameInput"
                    value={fullname}
                    name="fullname"
                    placeholder='Full Name'
                    autoComplete='off'
                    onChange={handleChange}
                />
            </div>
            <div className="fullname-input ms-3 mt-3">
                <Form.Control
                    type="text"
                    id="fullnameInput"
                    value={address}
                    name="address"
                    placeholder='Address'
                    autoComplete='off'
                    onChange={handleChange}
                />
            </div>
            <div className="fullname-input ms-3 mt-3">
                <Form.Control
                    type="text"
                    id="fullnameInput"
                    value={postcode}
                    name="postcode"
                    placeholder='Post Code'
                    autoComplete='off'
                    onChange={handleChange}
                />
            </div>
            <div className="btn-login ms-3">
                <button type='submit'>Register</button>
            </div>
        </Form>
            <div className="footer mt-3">
                <p className='ms-2'>
                    Already have an account ? Click <b onClick={switchLogin}>Here</b>
                </p>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register