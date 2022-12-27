import React from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  Form,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import "../my.css";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Navbar bg="warning" expand="lg">
        <Container fluid>
          <Navbar.Brand className="nav-color">
            <LinkContainer to="/">
              <Nav.Link className="nav-color">E-Commerce</Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link className="nav-color">
                  <i className="fa-solid fa-house"></i> Ana Sayfa
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link className="nav-color">
                  <i className="fa-solid fa-address-card"></i> Hakkımızda
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/urunler">
                <Nav.Link className="nav-color">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i> Ürünler
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  className="nav-color"
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="nav-color">
                      Profil
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    className="nav-color"
                    onClick={logoutHandler}
                  >
                    Çıkış
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-color">
                    <i className="fa-solid fa-user"></i> Üye Girişi
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown className="nav-color" title="Admin" id="username">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item className="nav-color">
                      Kullanıcılar
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="nav-color">
                      Ürün Listesi
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="nav-color">
                      Siparişler
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <LinkContainer to="/cart">
              <Nav.Link className="nav-color">
                <i className="fa-solid fa-bag-shopping"></i> Sepetim
              </Nav.Link>
            </LinkContainer>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Arayın"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">Ara</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
