import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap"
import Logo from "../../assets/img/logo-waysbook.png"
import ImageUser from "../../assets/img/nogambar.jpg"
import Bc from "../../assets/img/barcode.png"
import Rp from "rupiah-format"
import NavbarUser from '../../components/navbar/navbarUser';
import { useQuery } from 'react-query';
import { API } from '../../config/api';

const Profile = () => {

    const title = "Profile"
    document.title = title
    
    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get("/profile");
        return response.data.data;
    });
    
    let { data: transactions } = useQuery(
        "transactionsCache",
        async () => {
          const response = await API.get("/user-transaction");
          return response.data.data;
        }
      );

    return (
        <Container>
            <NavbarUser/>
            <Row>
                <div className="header-title-profile mt-5">
                    <p className="py-3 fw-bolder">My Profile</p>
                </div>
                <Col>
                    <div className="img-profile mt-4 me-3">
                        <img className="rounded" src={ImageUser} />
                    </div>
                </Col>
                <Col>
                    <div className="profile-data mt-5">
                        <div className="parents-profile-data">
                            <p>Full Name</p>
                        </div>
                        <div className="childs-profile-data mb-4">
                            <p>{profile?.fullName}</p>
                        </div>
                        <div className="parents-profile-data mt-5">
                            <p>Email</p>
                        </div>
                        <div className="childs-profile-data">
                            <p>{profile?.email}</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="title-transaction">
                        <p>My Transaction</p>
                    </div>
                    {transactions?.map((item,index) => (
                        <Card className="card-transaction mb-5">
                            {item?.carts?.map((cart, idx) => (
                                <div className="left-side-card d-flex" key={index}>
                                    <img className="rounded py-3 ms-3 me-3" src={"http://localhost:5000/uploads/" + cart?.product?.image }/>
                                    <div className="datas-transaction mt-4 ">
                                        <div className="title-names-transaction">
                                            <p>{cart?.product?.title}</p>
                                        </div>
                                        <div className="toping-transaction">
                                            <div className="just-toping">
                                                Toping
                                                &nbsp; : <b className="times-new">
                                                {cart.topping.map((topping, idx) => (
                                                <span key={idx}>{topping?.title},</span>
                                                ))}
                                                </b>
                                            </div>
                                        </div>
                                        <div className="price-transaction mt-2">
                                            <b className='times-new mt-2'>Price : {Rp.convert(cart?.product?.price)}</b>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="right-side-card position-absolute">
                                <div className="logo-transaction">
                                    <img className="position-absolute" src={Logo} />    
                                </div>
                                <div className="barcode-transaction">
                                    <img className="position-absolute" src={Bc} />
                                </div> 
                                <div className="button-transaction">
                                    <button className="position-absolute">
                                        .
                                    </button>
                                    <b className='fw-bold position-absolute'>{item?.status}</b>
                                </div>
                                <div className="sub-total-transaction">
                                    <p className='position-absolute'>Sub Total : {Rp.convert(item?.amount)} </p>
                                </div>
                            </div>                             
                        </Card>
                        ))}
                </Col>
            </Row>
        </Container>
    )
}

export default Profile

