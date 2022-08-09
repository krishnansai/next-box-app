import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Navebar from "./components/Navebar";
import { commonRoutes, userRoutes, adminRoutes } from "./config/routeenum";
import SingleProductDetail from "./Pages/common/SingleProductDetail";
import "react-toastify/dist/ReactToastify.css";

import ChatBotComponent from "./components/Chatbot";
import options from "./config/chatBotConfig";

import {
  Auth,
  Home,
  UserDashboard,
  Aboutus,
  Dashboard,
  AddProducts,
  OrderedProducts,
  UserList,
} from "./Pages/index";
import Cart from "./Pages/user/Cart";
import UserProfile from "./Pages/user/UserProfile";
import { useState } from "react";

function App() {
  const [showBot, setShowBot] = useState(false);

  return (
    <BrowserRouter>
      <Navebar />
      <div
        className="chatbotcontainer"
        onClick={() => {
          setShowBot(!showBot);
        }}
      >
        <img
          src="https://img.icons8.com/ios/50/ffffff/chat--v1.png"
          id="chatbottrigger"
        />
      </div>
      {showBot ? <ChatBotComponent steps={options}></ChatBotComponent> : <></>}

      <Routes>
        <Route path={commonRoutes.LOGIN} element={<Auth />} />
        <Route path={commonRoutes.REGISTER} element={<Auth />} />
        <Route path={commonRoutes.HOME} element={<Home />} />
        <Route path={commonRoutes.ABOUTUS} element={<Aboutus />} />
        <Route
          path={commonRoutes.SIGNLEPRODUCT}
          element={<SingleProductDetail />}
        />

        <Route
          path={userRoutes.DASHBOARD}
          element={<AuthRoute Component={UserDashboard} />}
        />
        <Route
          path={userRoutes.CART}
          element={<AuthRoute Component={Cart} />}
        />
        <Route
          path={userRoutes.PROFILE}
          element={<AuthRoute Component={UserProfile} />}
        />
        <Route
          path={adminRoutes.DASHBOARD}
          element={<AuthRoute Component={Dashboard} />}
        />
        <Route
          path={adminRoutes.ADDPRODUCTS}
          element={<AuthRoute Component={AddProducts} />}
        />
        <Route
          path={adminRoutes.ORDEREDPRODUCTS}
          element={<AuthRoute Component={OrderedProducts} />}
        />
        <Route
          path={adminRoutes.USERS}
          element={<AuthRoute Component={UserList} />}
        />
        <Route
          path="*"
          element={
            <>
              <h1>404</h1>
              <h3>There is nothing here...🤦‍♀️😢</h3>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
