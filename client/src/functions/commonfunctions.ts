import { axiosInstance as axios } from "../config/axiosInstance";

const addProduct = (values: any, data: any) => {
  let formData = new FormData();
  let files: any = data.files;
  // let fileNames : [] = []

  for (let i of files) {
    formData.append("file", i);
  }

  formData.append("productName", values.productName);
  formData.append("price", values.price);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("size", data.size);
  formData.append("gsm", data.gsm);
  formData.append("paper", data.paper);
  formData.append("how", data.how);
  return axios.post("/product/add", formData);
};

// parse cookie and return user id
const cookie: any = (name: string) => {
  let cookiee = document.cookie ? document.cookie : "";
  let cookies = cookiee.split(";");
  let cookieValue = "";
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split("=");
    if (cookie[0].trim() == name) {
      cookieValue = cookie[1];
      break;
    }
  }
  return cookieValue;
};

// add user profile
const addUserProfile = async (values: any) => {
  console.log("ee");
  let formData = new FormData();
  formData.append("firstName", values.firstName);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("address", values.address);
  formData.append("state", values.state);
  formData.append("postCode", values.postCode);
  return await axios.post("/user/addprofile", formData);
};

export { addProduct, cookie, addUserProfile };
