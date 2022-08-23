import React from "react";
import { Modal , Card} from "react-bootstrap";
import Rupiah from "rupiah-format";
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import Logo from "../../assets/img/logo-waysbook.png";
import Barcode from "../../assets/img/barcode.png"


export default function ModalTransaction({ showTrans, close, id }) {
  
    let { data: transaction } = useQuery("transactionCache", async () => {
        const response = await API.get("/transaction/" + id);
        console.log(response);
        return response?.data?.data;
      });

  return (
    <Modal show={showTrans} onHide={close} className="modal-transaction">
      <Card className="card-transaction">
        {transaction?.carts?.map((item, index) => (
              <div className="left-side-card d-flex" key={index}>
                  <img className="rounded py-3 ms-3 me-3" src={"http://localhost:5000/uploads/" + item.product.image}/>
                  <div className="datas-transaction mt-4 ">
                      <div className="title-names-transaction">
                          <p>{item.product.title}</p>
                      </div>
                      <div className="toping-transaction">
                          <div className="just-toping">
                              Toping
                              &nbsp; : <b className="times-new">
                                  {item?.topping?.title}
                              </b>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
          <div className="right-side-card position-absolute">
              <div className="logo-transaction">
                  <img className="position-absolute" src={Logo} />    
              </div>
              <div className="barcode-transaction">
                  <img className="position-absolute" src={Barcode} />
              </div> 
              <div className="button-transaction">
                  <button className="position-absolute">
                      .
                  </button>
                  <b className='fw-bold position-absolute'>{transaction?.status}</b>
              </div>
              <div className="sub-total-transaction">
                  <p className='position-absolute'>Sub Total : {Rupiah.convert(transaction?.amount)} </p>
              </div>
          </div>                             
      </Card>
    </Modal>
  );
}