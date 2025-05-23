import { Link } from "react-router-dom";

function Success() {
  return (
    <>
      {/*	Order Success	*/}
      <div id="order-success">
        <div className="row">
          <div id="order-success-img" className="col-lg-3 col-md-3 col-sm-12" />
          <div id="order-success-txt" className="col-lg-9 col-md-9 col-sm-12">
            <h3>bạn đã đặt hàng thành công !</h3>
            <p>Vui lòng kiểm tra email để xem lại thông tin đơn hàng của mình.</p>
            <Link to={"/order"}>Bấm vào đơn hàng đã mua để xem chi tiết</Link>
          </div>
        </div>
      </div>
      {/*	End Order Success	*/}
    </>
  );
}

export default Success;
