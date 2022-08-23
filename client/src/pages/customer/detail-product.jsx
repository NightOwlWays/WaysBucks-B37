import React, { useState} from 'react';
import { Container, Row, Col} from "react-bootstrap"
import Rp from "rupiah-format"
import { useParams, useNavigate } from 'react-router-dom';
import NavbarUser from "../../components/navbar/navbarUser";
import { useQuery , useMutation} from 'react-query';
import { API } from '../../config/api';


const DetailProduct = () => {
    const navigate = useNavigate();


    let { id } = useParams();

    const title = ' Detail Product '
    document.title = title 

    const [toping, setToping] = useState([]);
    const [topping_id, setIdToping] = useState([]);

    
    const handleOnchage = (e) => {
        
        let updateToping = [...toping];
        if (e.target.checked) {
          updateToping = [...toping, e.target.value];
        } else {
          updateToping.splice(toping.indexOf(e.target.value));
        }
        setToping(updateToping);
    
        let toppingId = [...topping_id];
        if (e.target.checked) {
          toppingId = [...topping_id, parseInt(e.target.name)];
        } else {
          toppingId.splice(topping_id.indexOf(e.target.name));
        }
    
        setIdToping(toppingId);
       
    

    };

    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });

    let { data: toppings } = useQuery('toppingsCache', async () => {
        const response = await API.get("/toppings");
        return response.data.data;
    });

    let total = toping.reduce((a, b) => {
        return a + parseInt(b);
      }, 0);

    let subamount = product?.price + total;

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
            
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const body = JSON.stringify({
            topping_id: topping_id,
            subamount: subamount,
            product_id: parseInt(id),
          });
    

          await API.post("/cart", body, config);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      });

    return (
        <Container>
            <NavbarUser/>
            <Row id="row-detail-product">
                <Col className="detail-drink mt-5">
                    <img id="detail-img-drink" className='mt-4 shadow-lg' src={product?.image} value={product?.image}/>
                </Col>
                <Col id="right-side-addtpg" className="mt-5">
                    <div className="title-detail-product">
                        <p className="mt-4">{product?.title}</p>
                    </div>
                    <div className="price-drink">
                        <p className="mt-2">{Rp.convert(product?.price)}</p>
                    </div>
                    <div className="toping-add">
                        <p className='mt-5'>Toping</p>
                    </div>

                    <Row>
                    {toppings?.map((item, index) => (
                        <div key={index} className="topping-data ms-1 col">
                            <div className="img-data-toping toppings-list-item" >
                                <div>
                                    <input type="checkbox" className="poppingCheck" style={{display:"none"}} id={`custom-checkbox-${index}`} value={item.price} name={item.id} onChange={handleOnchage}/>
                                    <label htmlFor={`custom-checkbox-${index}`}>
                                        <img className="mb-3 cursor-pointer" src={item.image}/>
                                    </label>
                                    
                                    <p id="toping-name" className="mb-5">{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                        <div className="sub-total d-flex mb-5">
                            <div className="left-total">
                                Total
                            </div>
                            <div className="right-total">
                                {Rp.convert(product?.price + total)}
                            </div>
                        </div>
                        <div className="btn-add-cart mb-5 mt-2">
                            <button className="mb-2" type="submit" onClick={(e) => handleSubmit.mutate(e)} >Add Cart</button>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default DetailProduct