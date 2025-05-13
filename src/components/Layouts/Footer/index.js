import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/*	Footer	*/}
      <div id="footer-top">
        <div className="container">
          <div className="row">
            <div id="logo-2" className="col-lg-3 col-md-6 col-sm-12">
              <h2>
                <Link to={""} href="#">
                  <img id="fix-mt" src="images/logo2.jpg" alt="logo" height={40} width={250} />
                </Link>
              </h2>
              <p>
                Tại Mobile Phone, chúng tôi chuyên cung cấp các dòng điện thoại mới nhất từ các thương hiệu hàng đầu như
                Apple, Samsung, Xiaomi, Oppo, và nhiều hãng khác. Với cam kết sản phẩm chính hãng, giá cả cạnh tranh và
                dịch vụ hậu mãi chu đáo, chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu.
              </p>
            </div>
            <div id="address" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Địa chỉ</h3>
              <p>Chương Dương - Thường Tín - Hà Nội</p>
              <p>Số 25 Ngõ 178/71 - Tây Sơn Đống Đa - Hà Nội</p>
            </div>
            <div id="service" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Dịch vụ</h3>
              <p>Bảo hành rơi vỡ, ngấm nước Care Diamond</p>
              <p>Bảo hành Care X60 rơi vỡ ngấm nước vẫn Đổi mới</p>
            </div>
            <div id="hotline" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Hotline</h3>
              <p>Phone Sale: (+84) 0865 498 360</p>
              <p>Email: thanh2520@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>2020 © Mobile Phone.</p>
            </div>
          </div>
        </div>
      </div>
      {/*	End Footer	*/}
    </>
  );
}

export default Footer;
