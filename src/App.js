import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import Header from "./components/Layouts/Header";
import Menu from "./components/Layouts/Menu";
import Slider from "./components/Layouts/Slider";
import Sidebar from "./components/Layouts/Sidebar";
import Footer from "./components/Layouts/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

import { PersistGate } from "redux-persist/integration/react";
import { privateRouter, publicRouter } from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header />
          {/*	Body	*/}
          <div id="body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Menu />
                </div>
              </div>
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  <Slider />
                  <Routes>
                    {publicRouter.map((route, index) => (
                      <Route element={<route.element />} path={route.path} key={index} />
                    ))}
                    {privateRouter.map((route, index) => (
                      <Route
                        element={
                          <ProtectedRoute>
                            <route.element />
                          </ProtectedRoute>
                        }
                        path={route.path}
                        key={index}
                      />
                    ))}
                  </Routes>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          {/*	End Body	*/}
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
