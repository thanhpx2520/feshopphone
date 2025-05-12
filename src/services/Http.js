import axios from "axios";
import { API_URL } from "../config/index";
// import { store } from "../redux/store";
// import { clearCustomer, updateRefreshToken } from "../redux/reducers/AuthReducer";
// import { getRefeshToken } from "./Api";

const Http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Http.interceptors.request.use(
//   async (config) => {
//     const accessToken = store.getState().auth.accessToken;
//     config.headers["token"] = `Bearer ${accessToken}`;
//     return config;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );

// Http.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log(error);

//     const { response } = error;
//     if (response.data === "Token expired") {
//       if (response.config.url.indexOf("/customer/refreshtoken") >= 0) return error;
//       const data = (await getRefeshToken()).data;
//       const newAccessToken = data.accessToken;
//       console.log(`newAccessToken:::${newAccessToken}`);
//       store.dispatch(
//         updateRefreshToken({
//           accessToken: newAccessToken,
//         })
//       );
//       response.config.headers["token"] = `Bearer ${newAccessToken}`;
//       return Http(response.config);
//     }
//     if (response.data === "Dirty token") {
//       store.dispatch(clearCustomer());
//       alert("Tài khoản của bạn đã hết hạn hoặc đang bị đăng nhập từ một thiết bị khác!");
//     }
//     return Promise.reject(error);
//   }
// );

export default Http;
