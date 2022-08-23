import React, {useContext} from "react";
import Logo from "../../assets/img/logo-waysbook.png";
import Blank from "../../assets/img/nogambar.jpg";
import Cart from "../../assets/img/cart.png"
import Profile from "../../assets/img/user.png"
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/img/logout.png"
import { API } from '../../config/api';
import { useQuery } from 'react-query';

function NavbarUser() {


    const [_, dispatch] = useContext(UserContext)
    const moving = useNavigate()

    const moveToProfile = () => {
        moving('/profile')
    }

    const moveToHome = () => {
        moving('/')
    }

    const moveToCart = () => {
      moving('/cart')
  }

    const Logout = () => {
      dispatch({
          type:"LOGOUT"
      })
      moving("/Auth")
    }
    let { data: carts , refetch } = useQuery('cartsCache', async () => {
      const response = await API.get("/carts-id");
      return response.data.data;
    });


  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
          <span class="badge rounded-pill bg-danger" style={{position:"absolute", top:"35px", right:"90px"}}> 
            {carts?.length}
              <span>
              </span> 
          </span>
            <a className="navbar-brand">
              <img id="logo-nav" src={Logo} onClick={moveToHome} width="75" height="75" alt="" />
            </a>
            <div className="d-flex align-items-center">
              <div className="justify-content-end d-flex me-2">
                <a onClick={moveToCart} style={{ textDecoration: "none",cursor:'pointer'}}>
                <img src={Cart} alt="" className="me-3" height="30px" width="30px"/>
                </a>
              </div>

              <div className="justify-content-end d-flex"id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img className="rounded-circle border border-danger border-2" src={Blank} width="50"height="50"alt=""/>
                    </a>
                    <div id="dropdown-menu" className="dropdown-menu shadow-lg" aria-labelledby="navbarDropdown">
                    <div id="triangle" className="position-absolute"></div>
                      <a id="profile-nav" className="dropdown-item" onClick={ moveToProfile }>
                        <img src={Profile} alt="" className="icon-dropdown" /> Profile
                      </a>
                      <div className="dropdown-divider"></div>
                      <a id="profile-nav" className="dropdown-item" onClick={ Logout } style={{cursor:'pointer'}}>
                        <img src={LogoutIcon} alt="" className="icon-dropdown"/> Log out
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

export default NavbarUser;


