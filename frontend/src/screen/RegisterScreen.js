import React, { useEffect, useState } from "react";
import { useLocation,useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { Button,Form, Row, Col } from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";
import FormContainer from "../component/FormContainer";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Parola Eşleşmedi");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Kayıt Ol</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>İsim</Form.Label>
            <Form.Control
              type="text"
              placeholder="İsminizi Giriniz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Adresi</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email adresinizi giriniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Parola</Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Parola Tekrarı</Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi Tekrar Giriniz"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="warning">
            {" "}
            Kaydol
          </Button>
          <Row className="py-3">
            <Col>
              Zaten Hesabın Var Mı? 
              <Link to={redirect ? `/login?redirect={redirect}` : "/login"}>
                Giriş Yap
              </Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
