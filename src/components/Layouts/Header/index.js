import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { clearCart } from "../../../redux/reducers/CartReducer";
import { clearAuthData } from "../../../redux/reducers/AuthReducer";

function Header() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector(({ cart }) => cart.items);
  const auth = useSelector(({ auth }) => auth.user);

  const [checkLogin, setCheckLogin] = useState(null);
  const [totalProducts, setTotalProducts] = useState(() => items.reduce((total, item) => total + item.qty, 0));

  const handleLogout = () => {
    // const idCustomer = auth?._id;
    // logout(idCustomer)
    //   .then(() => {
    dispatch(clearCart());
    dispatch(clearAuthData());
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const navigateSearch = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  useEffect(() => {
    setTotalProducts(() => items.reduce((total, item) => total + item.qty, 0));
    setCheckLogin(auth);
  }, [items, auth]);

  return (
    <>
      {/*	Header	*/}
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/" className="d-flex bg-white p-2 logo-link">
                  <img id="logo-header" className="img-fluid" src="images/logo1.jpg" alt="" />
                  <h6 className="text-dark mt-4 ml-2 text-decoration-none">Shop Phone No1 Ha Noi</h6>
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      navigateSearch();
                    }
                  }}
                  value={keyword}
                />
                {/* <input /> */}
                <button className="btn btn-danger mt-3" type="button" onClick={navigateSearch}>
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              <i className="fa-solid fa-user mr-1" />
              {checkLogin !== null ? (
                <>
                  <Link className="mr-2 ml-2" to="/myInfo">
                    {auth?.email}
                  </Link>
                  <Link to="/login" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket header-logout"></i>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="mr-2" to="/login">
                    đăng nhập
                  </Link>
                  |
                  <Link className="mr-2 ml-2" to="/register">
                    đăng ký
                  </Link>
                </>
              )}
              |
              <Link className="mt-4 mr-2 ml-2 my-cart" to="/cart">
                giỏ hàng
                <ul>
                  <li>
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" /> Giỏ hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link to="/order">
                      <i className="fas fa-file-alt fix-icon" /> Đơn hàng đã mua
                    </Link>
                  </li>
                </ul>
              </Link>
              <span className="mt-3">{totalProducts}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      {/*	End Header	*/}
    </>
  );
}

export default Header;
