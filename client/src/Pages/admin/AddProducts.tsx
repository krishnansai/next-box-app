import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { _loguser, _registeruser } from "../../functions/authfunctions";
import * as Yup from "yup";
import { useState } from "react";
import { addProduct } from "../../functions/commonfunctions";
import { Button, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import style from "../../config/style";

const AddProducts = () => {
  const navigator = useNavigate();
  const notify = () => toast("Product Added Successfully!🔥");

  const coredata = {
    category: [
      "Select Category",
      "Cotton packing box",
      "Glass packing box",
      "Dress packing box",
      "Plastic packing box",
      "stationary packing box",
      "Leather packing box",
      "Fruits packing box",
      "Tiles packing box",
      "Rubber packing box",
      "Food packing box",
      "Appliances packing box",
      "chappals packing box",
    ],
    types: ["Select Type", 3, 5, 7, 9],
    papers: [
      "Select Paper",
      "Natural",
      "Golden",
      "Cow boys red",
      "Offset boxes(domestic boxes)",
    ],
    gsmTypes: ["Select GSM Type", 100, 120, 140, 150, 180],
    how: [
      "Select How Paper Made ",
      "All 100 GSM",
      "All 180 GSM",
      "ALL 140 GSM",
      "TOP 180 GSM & Rest all 100 GSM ",
      "TOP 140 GSM & Rest all 100 GSM",
      "TOP 150 GSM & Rest all 100 GSM",
    ],
  };

  const [data, setData] = useState({
    category: "",
    files: {},
    description: "",
    size: "",
    gsm: "",
    paper: "",
    how: "",
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addProduct(values, data).then((res) => {
        setSubmitting(false);
        resetForm();
        setData({
          category: "",
          files: {},
          description: "",
          size: "",
          gsm: "",
          paper: "",
          how: "",
        });
        notify();
        window.location.reload();
      });
    },
  });
  return (
    <div>
      <AddProductWrapper>
        <Form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column align-items-center mt-5"
        >
          <h1>Add Product</h1>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="productName">Product Name</Form.Label>
            <Form.Control
              id="productName"
              type="text"
              {...formik.getFieldProps("productName")}
            />
            {formik.touched.productName && formik.errors.productName ? (
              <div className="error">{formik.errors.productName}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              id="username"
              type="number"
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="category">Category</Form.Label>
            <Form.Select
              name="category"
              id="category"
              required
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              {coredata.category.map((item, i) => (
                <option key={item} value={i == 0 ? "" : item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="size">Size</Form.Label>
            <Form.Select
              name="size"
              id="size"
              required
              value={data.size}
              onChange={(e) => setData({ ...data, size: e.target.value })}
            >
              {coredata.types.map((type, i) => (
                <option key={type} value={i == 0 ? "" : type + "ply"}>
                  {type + " ply"}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="size">Papers</Form.Label>
            <Form.Select
              name="papers"
              id="papers"
              required
              value={data.paper}
              onChange={(e) => setData({ ...data, paper: e.target.value })}
            >
              {coredata.papers.map((item, i) => (
                <option key={item} value={i == 0 ? "" : item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="size">GSM Type</Form.Label>
            <Form.Select
              name="gsm"
              id="gsm"
              required
              value={data.gsm}
              onChange={(e) => setData({ ...data, gsm: e.target.value })}
            >
              {coredata.gsmTypes.map((item, i) => (
                <option key={item} value={i == 0 ? "" : item + " GSM"}>
                  {item + " GSM"}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="size">How It is Made ?</Form.Label>
            <Form.Select
              name="how"
              id="how"
              required
              value={data.how}
              onChange={(e) => setData({ ...data, how: e.target.value })}
            >
              {coredata.how.map((item, i) => (
                <option key={item} value={i == 0 ? "" : item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              id="description"
              className="description"
              cols={51}
              rows={10}
              value={data.description}
              required
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label htmlFor="profuctimage" className="productimage">
              Product Images
            </Form.Label>
            <Form.Control
              type="file"
              name="productimage"
              id="productimage"
              multiple
              accept="image/*"
              size="lg"
              required
              onChange={(e: any) => {
                setData({ ...data, files: e.target.files || {} });
              }}
            />
            <button className="btn btn-primary mt-4" type="submit">
              Submit
            </button>
          </Form.Group>
        </Form>
      </AddProductWrapper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
      />
    </div>
  );
};

const AddProductWrapper = styled.div`
  background-color: #1b1c1b;
  width: 60%;
  margin: auto;
  border-radius: 20px;
  box-shadow: ${style.colors.shadow};
  margin-bottom: 20%;

  h1 {
    font-size: 4.2rem;
    font-family: ${style.fontfamily.heading};
  }

  form {
    padding: 20px;
    width: 100%;

    h1 {
      color: ${style.colors.complementry};
    }
  }

  .error {
    color: red;
    font-size: ${style.fontsize.error};
    padding-top: 4px;
  }

  h3 {
    font-family: ${style.fontfamily.heading};
    color: white;
    letter-spacing: 1px;
  }

  label {
    color: white;
  }

  button {
    background-color: ${style.colors.accent};
  }
`;

export default AddProducts;
