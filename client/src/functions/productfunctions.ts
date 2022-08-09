import { axiosInstance as axios } from "../config/axiosInstance";

const removeProductFromCart = (id: any) => {
  return axios.post("/user/deletefromcart", { id });
};

const commonOrderingRequirments = (id: string) => {
  let loggedIn =
    sessionStorage.getItem("NQi6OMGG0sa_7UW_noxIn1ZS0-XVk&d") == "ok";

  if (!loggedIn) {
    window.location.href = `/login#next?=#${id}`;
    return;
  }

  return true;
};

const orderproduct = (product: any) => {
  commonOrderingRequirments(product.productId);

  return axios.post("/product/order", product);
};

const addtocart = (product: any) => {
  commonOrderingRequirments(product.productId);

  return axios.post("/product/addtocart", product);
};

const deleteProduct = (id: any) => {
  return axios.delete(`/product/delete/${id}`);
};

export {
  orderproduct,
  commonOrderingRequirments,
  addtocart,
  deleteProduct,
  removeProductFromCart,
};
