import { Container, Table, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import styled from "styled-components";
import style from "../../config/style";
import LoadingPage from "../common/LoadingPage";

const UserList = () => {
  const { error, loading, response } = useFetch(`/user/`, {});

  const deleteUser = (id: string) => {
    console.log(id);
  };

  return (
    <UserWrapper>
      <h1 className="pb-4">User List</h1>
      {loading ? <LoadingPage /> : error ? <div>{error}</div> : <></>}
      <Table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Show Details</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {response &&
            response.map((user: any, i: number) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>
                  <Link to={`/user/show/${user._id}`}>
                    <button className="btn btn-primary">View</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/user/delete/${user._id}`}>
                    <button className="btn btn-danger">Delete</button>
                  </Link>
                </td> */}
              </tr>
            ))}
        </tbody>
      </Table>
    </UserWrapper>
  );
};

const UserWrapper = styled.div`
  color: white;
  width: 70%;
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

export default UserList;
