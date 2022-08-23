import React, { useState } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap"
import IconUpload from "../../assets/img/ikon-upload.png"
import noimage from "../../assets/img/no-photo.jpg"
import NavbarAdmin from '../../components/navbar/navbarAdmin';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

const AddToping = () => {
    const title = "Add Toping"
    document.title = title

    let navigate = useNavigate();

    const [previewName, setPreviewName] = useState("");
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        image: '',
        name: '',
        price: '',
      });

    const handleOnChange = (e) => {
        setForm(({
            ...form,
            [e.target.name]:e.target.type === 'file' ? e.target.files : e.target.value
          }))

          if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            setPreviewName(e.target.files[0].name);
          }
        };

        const handleSubmit = useMutation(async (e) => {
            try {
              e.preventDefault();
        
              // Configuration
              const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };
        
              // Store data with FormData as object
              const formData = new FormData();
              
              formData.set('title', form.title);
              formData.set('price', form.price);
              formData.set('image', form.image[0], form.image[0].name);

              console.log(form);
        
              // Insert product data
              const response = await API.post('/topping', formData, config);
              console.log(response);
        
              navigate('/transaction');
            } catch (error) {
              console.log(error);
            }
        });
    return (
        <Container>
            <NavbarAdmin/>
            <Row className="ms-5">
                <Col id="left-side-form" className="mt-4">
                    <div className="header-title mt-5">
                        <p className="title-add-product mb-5">
                            Toping
                        </p>
                    </div>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <Form.Control name="title" onChange={handleOnChange} autoComplete="off" className="formInputProduct" type="text" placeholder="Name Toping" />
                        </Form.Group>
                        <Form.Group className="mb-2 mt-4" controlId="formInputProduct">
                            <Form.Control name="price" onChange={handleOnChange} autoComplete="off" className="formInputProduct mt-4" type="text" placeholder="Price" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <input type="file" id="upload" name="image" onChange={handleOnChange} hidden />
                            <label for="upload" className="label-file-add-product">
                                <img className="position-absolute" src={IconUpload}/>
                            </label>
                            <Form.Control className="formInputProduct" value={previewName} type="text" placeholder="Photo Topping" />
                        </Form.Group>
                        <div className="btn-submit-prdct ms-5">
                            <button type='submit'>Add Topping</button>
                        </div>
                    </Form>
                </Col>
                <Col className="ms-4 mt-5">
                    <div className="img-detail-product ms-3 mt-3 mb-5">
                        <img src={preview || noimage} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AddToping