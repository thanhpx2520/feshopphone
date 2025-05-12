import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postOrder } from "../../services/Api";
import { updateItemCart, deleteItemCart, clearCart } from "../../redux/reducers/CartReducer";
import { getImageProduct, getPrice } from "../../utils";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector(({ cart }) => cart.items);
  const customer = useSelector(({ auth }) => auth.user);

  const [customerInfo, setCustomerInfo] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [dataItems, setDataItems] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(<></>);

  useEffect(() => {
    if (customer) {
      setCustomerInfo({
        full_name: customer.full_name || "",
        email: customer.email || "",
        phone_number: customer.phone_number || "",
        address: customer.address || "",
      });
    }

    const newDataItems = items.map((item) => ({
      prd_id: item._id,
      price: item.price,
      qty: item.qty,
    }));
    setDataItems(newDataItems);
  }, [customer, items]);

  const handleChangeCustomer = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitOrder = () => {
    const dataOrder = {
      customer_id: customer?._id,
      ...customerInfo,
      totalPrice: totalPrice(items),
      items: dataItems,
    };

    setHasPurchased(
      <div className="wait">
        <p>Vui lòng đợi ... Đang xử lý</p>
      </div>
    );

    postOrder(dataOrder)
      .then(() => {
        dispatch(clearCart());
        navigate("/success");
      })
      .catch((err) => console.log(err));
  };

  const totalPrice = (items) => {
    return items?.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const changeQty = (e, id) => {
    const { value } = e.target;
    if (value <= 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?");
      return isConfirm ? dispatch(deleteItemCart({ _id: id })) : false;
    }
    return dispatch(updateItemCart({ _id: id, qty: Number(value) }));
  };

  const clickDeleteItemCart = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?");
    return isConfirm ? dispatch(deleteItemCart({ _id: id })) : false;
  };

  const checkOrder = () => {
    if (items.length === 0) {
      return (
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link to={"/"}>
            <b>Xem sản phẩm</b>
            <span>Thêm sản phẩm để mua hàng</span>
          </Link>
        </div>
      );
    }
    if (customer) {
      return (
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link to={""} onClick={submitOrder}>
            <b>Mua ngay</b>
            <span>Giao hàng tận nơi siêu tốc</span>
          </Link>
        </div>
      );
    }
    return (
      <div className="by-now col-lg-6 col-md-6 col-sm-12">
        <Link to={"/login"}>
          <b>Đăng nhập/Mua ngay</b>
          <span>Đăng nhập để mua hàng/Giao hàng tận nơi siêu tốc</span>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {items?.map((item) => (
            <div key={item._id} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} alt={item.name} />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <input
                  onChange={(e) => changeQty(e, item._id)}
                  type="number"
                  className="form-control form-blue quantity"
                  value={item.qty}
                />
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{getPrice(item.qty * item.price)}đ</b>
                <Link to={""} onClick={(e) => clickDeleteItemCart(e, item._id)}>
                  Xóa
                </Link>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{getPrice(totalPrice(items))}đ</b>
            </div>
          </div>
        </form>
      </div>

      {hasPurchased}

      <div id="customer">
        {customer ? (
          <>
            <h4 className="mt-3">Thông tin người mua hàng</h4>
            <div className="row">
              <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                <label className="mx-1">Họ và tên người nhận</label>
                <input
                  placeholder="Họ và tên người nhận (bắt buộc)"
                  type="text"
                  name="full_name"
                  value={customerInfo.full_name}
                  onChange={handleChangeCustomer}
                  className="form-control"
                />
              </div>
              <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                <label className="mx-1">Email người nhận</label>
                <input
                  placeholder="Email nhận hàng (bắt buộc)"
                  type="text"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleChangeCustomer}
                  className="form-control"
                />
              </div>
              <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                <label className="mx-1">Số điện thoại người nhận</label>
                <input
                  placeholder="Số điện thoại người nhận (bắt buộc)"
                  type="text"
                  name="phone_number"
                  value={customerInfo.phone_number}
                  onChange={handleChangeCustomer}
                  className="form-control"
                />
              </div>
              <div id="customer-add" className="col-lg-6 col-md-6 col-sm-12">
                <label className="mx-1">Địa chỉ người nhận</label>
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleChangeCustomer}
                  className="form-control"
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="row">
          {checkOrder()}
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={""}>
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0865 498 360</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
