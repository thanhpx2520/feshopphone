import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { postRegisterAccount } from "../../services/Api";

function Register() {
  const navigate = useNavigate();

  const [dataRegister, setDataRegister] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataRegister({ ...dataRegister, [name]: value });
  };

  const handleSubmit = () => {
    const { full_name, password, email, phone_number, address } = dataRegister;
    if (full_name && password && email && phone_number && address) {
      postRegisterAccount(dataRegister)
        .then(({ data }) => {
          setIsRegistered(false);
          setDataRegister(null);
          navigate("/login");
        })
        .catch((err) => {
          setIsRegistered(true);
          setDataRegister(null);
        });
    }
  };

  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        {isRegistered ? (
          <div className="alert alert-danger text-center">Thông tin Username hoặc Email đã tồn tại!</div>
        ) : (
          <></>
        )}
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="full_name"
                className="form-control"
                required
                onChange={handleInput}
                value={dataRegister?.full_name || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                onChange={handleInput}
                value={dataRegister?.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                onChange={handleInput}
                value={dataRegister?.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone_number"
                className="form-control"
                required
                onChange={handleInput}
                value={dataRegister?.phone_number || ""}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                onChange={handleInput}
                value={dataRegister?.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={""} onClick={handleSubmit}>
              <b>Đăng ký ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={"/"}>
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
}

export default Register;
