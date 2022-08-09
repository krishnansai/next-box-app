import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { deleteProduct } from "../../functions/productfunctions";
import styled from "styled-components";
import style from "../../config/style";
import LoadingPage from "../common/LoadingPage";

const Dashboard = () => {
  const { error, loading, response } = useFetch(`/product/`, {});

  let data = response;

  const deleteProd = (id: string) => {
    // deleteProduct(id);
    data = response.filter((product: any) => product._id !== id);
  };

  return (
    <DashboardWrapper>
      {loading ? <LoadingPage /> : error ? <h4>{error}</h4> : <></>}

      <h1 className="pb-4">Product Dashboard</h1>
      <Table className="text-dark fw-normal">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>View Product</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((product: any, i: number) => (
              <tr key={product._id}>
                <td>{i + 1}</td>
                <td>{product.productName}</td>
                <td>{product.price} ₹</td>
                <td>{product.category}</td>
                <td>
                  <Link to={`/product/${product._id}`}>
                    <button className="btn btn-primary">View</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProd(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  color: white;
  width: 80%;
  margin: auto;
  margin-top: 3%;

  h1 {
    font-size: 3.2rem;
    font-family: ${style.fontfamily.heading};
  }

  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    border-style: hidden !important;
  }
  table {
    background-color: ${style.colors.complementry};
    color: white !important;
    border-radius: 20px;
    padding: 20px;
    border-collapse: unset !important;

    tbody {
      tr {
        &:hover {
          background-color: #0000001a;
          cursor: pointer;
        }

        td {
          font-weight: 500 !important;
        }
      }
    }
  }
`;

export default Dashboard;
