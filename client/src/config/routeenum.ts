const enum commonRoutes {
  LOGIN = "/login",
  REGISTER = "/register",
  HOME = "/",
  COMMONPRODUCST = "/commonproducts",
  ABOUTUS = "/aboutus",
  CONTACTUS = "/contactus",
  SIGNLEPRODUCT = "/product/:id",
}

const enum userRoutes {
  PROFILE = "/user/profile",
  LOGOUT = "/logout",
  DASHBOARD = "/user/dashboard",
  CART = "/user/cart",
}

const enum adminRoutes {
  DASHBOARD = "/admin/dashboard",
  ADDPRODUCTS = "/admin/addproducts",
  ORDEREDPRODUCTS = "/admin/orderedproducts",
  USERS = "/admin/users",
}

export { commonRoutes, userRoutes, adminRoutes };
