import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import style from "../../config/style";
import LoadingPage from "../common/LoadingPage";

const OrderedProducts = () => {
  const { error, loading, response } = useFetch(`/product/`, {});

  return (
    <OrderedWrapper>
      <h1 className="pb-4">Ordered Products</h1>
      {loading ? <LoadingPage /> : error ? <h4>{error}</h4> : <></>}

      <Table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>View Product</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {response &&
            response.map((product: any, i: number) => (
              <tr key={product._id}>
                <td>{i + 1}</td>
                <td>{product?.productName}</td>
                <td>{product?.price}</td>
                <td>{product?.category}</td>
                <td>
                  <Link to={`/product/show/${product._id}`}>
                    <button className="btn btn-primary">View</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/product/delete/${product._id}`}>
                    <button className="btn btn-danger">Cancel Order</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </OrderedWrapper>
  );
};

const OrderedWrapper = styled.div`
  color: white;
  width: 80%;
  margin: auto;
  margin-top: 3%;

  h1 {
    font-size: 3.2rem;
    font-family: ${style.fontfamily.heading};
  }

  table {
    background-color: ${style.colors.complementry};
    color: white !important;
    border-radius: 20px;
    padding: 20px;
    border-collapse: unset !important;

    tbody,
    td,
    tfoot,
    th,
    thead,
    tr {
      border-style: hidden !important;
    }

    tbody {
      thead {
        tr {
          border-style: hidden !important;
        }
      }

      tr {
        border-style: hidden !important;

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

export default OrderedProducts;
