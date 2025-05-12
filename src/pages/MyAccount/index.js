import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { postEditUser } from "../../services/Api";
import { clearAuthData, editAuthData } from "../../redux/reducers/AuthReducer";

function Register() {
  const customer = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataEdit, setDataEdit] = useState(() => {
    const { full_name, address, email, phone_number } = customer;
    return {
      full_name,
      address,
      email,
      phone_number,
    };
  });

  const [check, setCheck] = useState(0);
  const [checkEdited, setCheckEdited] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
    setCheck(0);
  };

  const handleSubmit = () => {
    const { full_name, phone_number, email, password, address } = dataEdit;
    const isEmailChanged = email.trim() !== customer.email.trim();
    const isPasswordEntered = !!password && password.length > 0;
    if (isEmailChanged || isPasswordEntered) {
      console.log(password?.length);
      console.log(email !== customer.email);

      postEditUser(customer._id, dataEdit)
        .then(({ data }) => {
          if (data === "update customer successfully") {
            setCheckEdited("Sửa thông tin thành công");
            setCheck(1);
            setTimeout(() => {
              dispatch(clearAuthData());
              navigate("/login");
            }, 2000);
          }
        })
        .catch((err) => {
          if (err.response.data === "phone_number exists") {
            setCheckEdited("Số điện thoại đã tồn tại!");
            setCheck(-1);
          }
        });
    } else if (full_name.length && phone_number.length && address.length) {
      postEditUser(customer._id, dataEdit)
        .then(({ data }) => {
          if (data === "update customer successfully") {
            setCheckEdited("Sửa thông tin thành công");
            setCheck(1);
          }
          dispatch(editAuthData(dataEdit));
        })
        .catch((err) => {
          if (err.response.data === "phone_number exists") {
            setCheckEdited("Số điện thoại đã tồn tại!");
            setCheck(-1);
          }
        });
    } else {
      setCheckEdited("Không được để trống ô nào");
      setCheck(-2);
    }
  };

  const showAlert = () => {
    if (check === 1) {
      return <div className="alert alert-success text-center">{checkEdited}</div>;
    }
    if (check === -1) {
      return <div className="alert alert-danger text-center">{checkEdited}</div>;
    }
    if (check === -2) {
      return <div className="alert alert-danger text-center">{checkEdited}</div>;
    }
    return <></>;
  };

  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        {showAlert()}
        <h3 className="text-center">Sửa thông tin tài khoản</h3>
        <p className="text-danger text">
          Bạn có thể sửa thông tin tài khoản mua hàng mặc định của bạn ở đây, chúng tôi sẽ lấy thông tin này để bạn mua
          hàng HOẶC bạn có thể sửa thông tin mua hàng khi bạn ấn mua hàng !
        </p>
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
                value={dataEdit.full_name}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                required
                onChange={handleInput}
                value={dataEdit.password}
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
                value={dataEdit.email}
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
                value={dataEdit.phone_number}
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
                value={dataEdit.address}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={""} onClick={handleSubmit}>
              <b>Sửa thông tin</b>
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
