import React, { useContext} from "react";
import { UserContext } from "../../context/user-context";
import Logo from "../../assets/img/logo-waysbook.png";
import Blank from "../../assets/img/blank-profile.png";
import Product from "../../assets/img/product.png"
import Topping from "../../assets/img/topping.png"
import Logout from "../../assets/img/logout.png"
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
  
  const [_, dispatch] = useContext(UserContext)
  const moving = useNavigate()
  
  const moveToLogout = () => {
    dispatch({
        type:"LOGOUT"
    })
    moving("/Auth")
}

const moveToProduct = () => {
    moving('/add-product')
}

const moveToToping = () => {
  moving('/add-toping')
}

const moveToTransaction = () => {
  moving('/transaction')
}



  return (
    <div>
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
          <div class="container-fluid">
            <a class="navbar-brand" onClick={moveToTransaction}>
              <img src={Logo} width="75" height="75" alt="" />
            </a>

            <div class="d-flex align-items-center">

              <div class="justify-content-end d-flex"id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown" href="#" id="navbarDropdown" role="button"data-bs-toggle="dropdown"aria-haspopup="true" aria-expanded="false">
                      <img class="rounded-circle border border-danger border-2" src={Blank} width="50" height="50" alt=""/>
                    </a>
                    <div id="dropdown-menu" class="dropdown-menu shadow-lg" aria-labelledby="navbarDropdown">
                    <div id="triangle" className="position-absolute"></div>
                    <a id="profile-nav" class="dropdown-item" onClick={moveToProduct}>
                        <img src={Product} className="me-1 icon-dropdown" alt="" /> Add Product
                      </a>
                      <a id="profile-nav" class="dropdown-item" onClick={moveToToping}>
                        <img src={Topping} className="me-1 icon-dropdown" alt="" /> Add Topping
                      </a>
                      <div class="dropdown-divider"></div>
                      <a id="profile-nav" class="dropdown-item" onClick={moveToLogout} style={{cursor:'pointer'}}>
                        <img src={Logout} alt="" className="icon-dropdown"/> Log out
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarAdmin;
