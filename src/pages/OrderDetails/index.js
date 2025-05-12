import { getOderDetails } from "../../services/Api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImageProduct, getPrice } from "../../utils";

function OrderDetails() {
  const [productsOrder, setProductsOrder] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getOderDetails(id)
      .then(({ data }) => setProductsOrder(data.data.docs))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div>
        {/*	Order Details	*/}
        <div id="mycart">
          <div className="row d-flex flex-column">
            <div className="cart-nav-item fixed-border col-lg-7 col-md-7 col-sm-12">Thông tin người nhận</div>
            <div className="cart-detail-infor">
              <i className="fa-solid fa-user"></i> Tên: <span>{productsOrder.full_name}</span>
              <br />
              <i className="fa-solid fa-envelope"></i> Email: <span>{productsOrder.email}</span>
              <br />
              <i className="fa-solid fa-phone"></i> Số điện thoại: <span>{productsOrder.phone_number}</span>
              <br />
              <i className="fa-solid fa-location-dot"></i> Địa chỉ: <span>{productsOrder.address}</span>
            </div>
          </div>
        </div>
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Số lượng</div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {productsOrder?.items?.map((item) => {
              return (
                <div className="cart-item row" key={item.prd_id}>
                  <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    <img src={getImageProduct(item.prd_id.thumbnail)} alt={item.prd_id.name} />
                    <h4>{item.prd_id.name}</h4>
                  </div>
                  <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                    <p>{item.qty}</p>
                  </div>
                  <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                    <b>{getPrice(item.price)}</b>
                  </div>
                </div>
              );
            })}
            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{getPrice(productsOrder?.totalPrice)}đ</b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Order Details	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link to={"/order"}>
                <b>Về danh sách đơn hàng</b>
              </Link>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link to={"/"}>
                <b>Về trang chủ</b>
              </Link>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
}

export default OrderDetails;
