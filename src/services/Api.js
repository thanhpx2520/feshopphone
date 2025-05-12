import Http from "./Http";

const getMenu = (config) => Http.get("/categories", config);
const getNameOfCategory = (config, id) => Http.get(`/categories/${id}`, config);
const getProductsOfCategory = (config, id) => Http.get(`/categories/${id}/products`, config);
const getProducts = (config) => Http.get("/products", config);
const getProductDetails = (config, id) => Http.get(`/products/${id}`, config);
const getCommentsOfProduct = (config, id) => Http.get(`/products/${id}/comments`, config);
const postCommentsOfProduct = (id, data) => Http.post(`/products/${id}/comments`, data);
const getSlider = (config) => Http.get("/sliders", config);
const getBanner = (config) => Http.get("/banners", config);
const postRegisterAccount = (data) => Http.post("/auths/register", data);
const postLoginAccount = (data) => Http.post("/auths/login", data);
const postOrder = (data) => Http.post("/orders", data);
const getProductsOfOrder = (config, customerId) => Http.get(`/auths/${customerId}/orders`, config);
const postEditUser = (id, data) => Http.post(`/auths/${id}/update`, data);
const getCanceledOrder = (id) => Http.get(`/orders/${id}/canceled`);
const getOderDetails = (id) => Http.get(`/orders/${id}`);
const logout = (id) => Http.get(`/auths/${id}/logout`);
const getRefeshToken = (id) => Http.get(`/customer/refreshtoken`);

export {
  getMenu,
  getNameOfCategory,
  getProductsOfCategory,
  getProducts,
  getProductDetails,
  getCommentsOfProduct,
  postCommentsOfProduct,
  getSlider,
  getBanner,
  postRegisterAccount,
  postLoginAccount,
  postOrder,
  getProductsOfOrder,
  postEditUser,
  getCanceledOrder,
  getOderDetails,
  logout,
  getRefeshToken,
};
