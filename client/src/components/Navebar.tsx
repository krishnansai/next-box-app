import { Link } from "react-router-dom";
import { commonRoutes, adminRoutes, userRoutes } from "../config/routeenum";
import { _logoutuser } from "../functions/authfunctions";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../styles/navebar.scss";
import { useNavigate } from "react-router-dom";

const Navebar = () => {
  let admincommonLinks = [
    "/admin/dashboard",
    "/admin/addproducts",
    "/admin/orderedproducts",
    "/admin/users",
  ];

  let usercommonLinks = ["/user/profile", "/user/dashboard"];

  let cur = sessionStorage.getItem("role");

  if (cur == "admin") {
    return <AdminNavebar />;
  } else if (cur == "user") {
    return <UserNavebar />;
  } else {
    return <CommonNavebar />;
  }
};

const CommonNavebar = () => {
  const navigator = useNavigate();

  const onClickonLogo = () => {
    navigator("/");
  };

  return (
    <Navbar style={{ width: "100vw", position: "absolute", top: "0" }}>
      <Container>
        <Navbar.Brand className="logo" onClick={() => onClickonLogo()}>
          <h5>SAKTHI VELAVAN PACKAGES</h5>
        </Navbar.Brand>
        <Nav className="d-flex flex-row justify-content-center align-items-center">
          <Link
            to={commonRoutes.LOGIN}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Login</h6>
          </Link>
          <Link
            to={commonRoutes.REGISTER}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Register</h6>
          </Link>
          <Link
            to={commonRoutes.ABOUTUS}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase ">About Us</h6>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

const AdminNavebar = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">SAKTHI VELAVAN PACKAGES</Navbar.Brand>
        <Nav className="d-flex flex-row justify-content-center align-items-center">
          <Link
            to={adminRoutes.DASHBOARD}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Dashboard</h6>
          </Link>
          <Link
            to={adminRoutes.ADDPRODUCTS}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Add Products</h6>
          </Link>
          <Link
            to={adminRoutes.ORDEREDPRODUCTS}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Ordered Products</h6>
          </Link>
          <Link
            to={adminRoutes.USERS}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Users</h6>
          </Link>
          <Nav.Link>
            <button className="logout" onClick={() => _logoutuser()}>
              Logout
            </button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

const UserNavebar = () => {
  return (
    <Navbar className="w-100">
      <Container>
        <Navbar.Brand href="/">SAKTHI VELAVAN PACKAGES</Navbar.Brand>
        <Nav className="d-flex flex-row justify-content-center align-items-center">
          <Link to={"/"} className="link-primary p-2 text-decoration-none">
            <h6 className="text-uppercase">Home</h6>
          </Link>
          <Link
            to={userRoutes.PROFILE}
            className="link-primary p-2 text-decoration-none"
          >
            <h6 className="text-uppercase">Profile</h6>
          </Link>
          <Link
            to={userRoutes.CART}
            className="link-primary p-2 text-decoration-none"
          >
            <img src="https://img.icons8.com/ios-glyphs/30/ffffff/shopping-cart-promotion.png" />
          </Link>
          <button
            className="logout"
            style={{
              marginLeft: "10px",
            }}
            onClick={() => _logoutuser()}
          >
            Logout
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navebar;
