import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { postLoginAccount } from "../../services/Api";
import { setAuthData } from "../../redux/reducers/AuthReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataLogin, setDataLogin] = useState({});
  const [checkLogin, setCheckLogin] = useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSubmit = () => {
    const { email, password } = dataLogin;
    if (password && email) {
      postLoginAccount(dataLogin)
        .then(({ data }) => {
          const { user } = data;

          dispatch(setAuthData({ user }));
          setCheckLogin(true);
          setDataLogin(null);
          navigate("/");
        })
        .catch((err) => {
          setCheckLogin(false);
          setDataLogin(null);
        });
    }
  };

  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        {!checkLogin ? (
          <div className="alert alert-danger text-center">Thông tin Email hoặc Password không hợp lệ!</div>
        ) : (
          <></>
        )}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                onChange={handleInput}
                value={dataLogin?.email || ""}
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
                value={dataLogin?.password || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={""} onClick={handleSubmit}>
              <b>Đăng Nhập</b>
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

export default Login;
