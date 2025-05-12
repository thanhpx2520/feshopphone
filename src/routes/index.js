import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Order from "../pages/Order";
import Product from "../pages/Product";
import Search from "../pages/Search";
import Success from "../pages/Success";
import NotFound from "../pages/NotFound";
import OrderDetails from "../pages/OrderDetails";
import MyAccount from "../pages/MyAccount";

const publicRouter = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/category-:id",
    element: Category,
  },
  {
    path: "/cart",
    element: Cart,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/*",
    element: NotFound,
  },
  {
    path: "/product-:id",
    element: Product,
  },
  {
    path: "/search",
    element: Search,
  },
];

const privateRouter = [
  {
    path: "/order",
    element: Order,
  },
  {
    path: "/success",
    element: Success,
  },
  {
    path: "/order-:id",
    element: OrderDetails,
  },
  {
    path: "/myInfo",
    element: MyAccount,
  },
];

export { privateRouter, publicRouter };
