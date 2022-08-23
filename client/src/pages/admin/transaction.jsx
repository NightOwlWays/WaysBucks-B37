import React, { useState } from "react";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import ModalTransaction from "../../components/modal/transaction";

function Transaction() {

  const title = "Transaction"
  document.title = title

  const [showTrans, setShowTrans] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const handleShow = (id) => {
    setIdOrder(id);
    setShowTrans(true);
  };
  const handleClose = () => setShowTrans(false);

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (

    <div>
      <NavbarAdmin/>
      <div class="container my-5 text-red">
        <h3>Income Transaction</h3>
      </div>

      <div class="container px-5">
        <table class="table table-bordered border-dark">
            <thead>
            <tr>
                <th scope="col" class="bg-secondary bg-opacity-10">No</th>
                <th scope="col" class="bg-secondary bg-opacity-10">Name</th>
                <th scope="col" class="bg-secondary bg-opacity-10">Address</th>
                <th scope="col" class="bg-secondary bg-opacity-10">Post Code</th>
                <th scope="col" class="bg-secondary bg-opacity-10">Income</th>
                <th scope="col" class="bg-secondary bg-opacity-10">Status</th>
            </tr>
            </thead>
            <tbody>
            {transactions?.map((item, index) => (
            <tr onClick={() => handleShow(item?.id)} key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.user.fullName}</td>
                <td>{item.user.address}</td>
                <td>{item.user.postcode}</td>
                <td class="text-primary">{item.amount}</td>
                <td className= {`status-trans-${item.status}`} >{item.status}</td>
            </tr>
            ))}
            </tbody>
        </table>
      </div>
      <ModalTransaction
          showTrans={showTrans}
          close={handleClose}
          id={idOrder}
        />
    </div>
  );
}

export default Transaction;
