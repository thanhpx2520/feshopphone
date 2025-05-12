import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";

import { getProductsOfOrder, getCanceledOrder } from "../../services/Api";
import { getPrice } from "../../utils";
import Pagination from "../../components/common/pagination";

function Order() {
  const navigate = useNavigate();
  const [pages, setPages] = useState({
    total: 0,
    limit: 9,
    currentPage: 1,
  });
  const [productsOrder, setProductsOrder] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  // Manage canceled items as a set of IDs
  const [canceledOrders, setCanceledOrders] = useState(new Set());

  const customer = useSelector(({ auth }) => auth.user);

  const formatDateTime = (dateString) => {
    const date = moment(dateString);
    const formattedDate = date.format("DD-MM-YYYY");
    const formattedTime = date.format("HH:mm:ss");
    return `${formattedDate} hồi ${formattedTime}`;
  };

  const handleCancel = (item) => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm("Bạn có chắc chắn muốn hủy đơn hàng?");
    if (isConfirmed) {
      getCanceledOrder(item._id)
        .then(({ data }) => {
          setCanceledOrders((prev) => new Set(prev.add(item._id)));
        })
        .catch(({ err }) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getProductsOfOrder(
      {
        params: {
          page,
        },
      },
      customer._id
    )
      .then(({ data }) => {
        setProductsOrder(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((err) => console.log(err));
  }, [customer._id, page]);

  return (
    <>
      {/* Cart */}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Đơn hàng của bạn</div>
          <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">Tổng tiền</div>
        </div>
        <form method="post">
          {productsOrder?.map((item) => {
            let statusClassName = "";
            let button;
            if (item.status === 2) {
              statusClassName = "alert-success";
              button = (
                <button type="button" className="btn btn-success mb-1">
                  Đơn đã giao
                </button>
              );
            } else if (item.status === 0) {
              statusClassName = "alert-danger";
              button = (
                <button type="button" className="btn btn-danger mb-1">
                  Đơn đã hủy
                </button>
              );
            } else if (item.status === 1) {
              if (canceledOrders.has(item._id)) {
                statusClassName = "alert-danger";
                button = (
                  <button type="button" className="btn btn-danger mb-1">
                    Đơn đã hủy
                  </button>
                );
              } else {
                statusClassName = "";
                button = (
                  <>
                    <button type="button" className="btn btn-outline-danger mb-1" onClick={() => handleCancel(item)}>
                      Huỷ đơn
                    </button>
                    <button type="button" className="btn btn-outline-success mb-1">
                      Đơn đang giao
                    </button>
                  </>
                );
              }
            }
            return (
              <div key={item._id} className={`cart-item row ${statusClassName}`}>
                <div className={`cart-thumb col-lg-7 col-md-7 col-sm-12`}>
                  <h4>
                    Đơn hàng đã mua vào ngày: <span className="text-secondary">{formatDateTime(item.createdAt)}</span>
                  </h4>
                  <p>Mã Đơn (MĐ): {item._id}</p>
                </div>
                <div className="cart-price col-lg-2 col-md-2 col-sm-12">
                  <b>{getPrice(item.totalPrice)}đ</b>
                </div>
                <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                  <button
                    type="button"
                    className="btn btn-outline-dark mb-1"
                    onClick={() => navigate(`/order-${item._id}`)}
                  >
                    Chi tiết đơn hàng
                  </button>
                  {button}
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <button
                id="update-cart"
                className="btn btn-success"
                type="button"
                name="sbm"
                onClick={() => navigate("/")}
              >
                Quay về trang chủ
              </button>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              <div id="pagination">
                <Pagination pages={pages} />
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* End Cart */}
    </>
  );
}

export default Order;
