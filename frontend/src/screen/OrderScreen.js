import CheckOutSteps from "../component/CheckOutSteps";
import FormContainer from "../component/FormContainer";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import {
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Image,
} from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";

import {
  ORDER_CREATE_RESET,
  ORDER_DELIVER_RESET,
} from "../constans/orderConstans";
import { createOrder, getOrderDetails,deliverOrders } from "../actions/orderAction";

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading && !error) {
    order.ItemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  useEffect(() => {
    if (!userInfo) {
      history("/login");
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (!order || order._id !== Number(id) || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id, successDeliver]);
  const deliverHandler = () => {
    dispatch(deliverOrders(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Message variant="success">
        Siparişiniz Başarılı Bir Şekilde Alındı
      </Message>
      ,{" "}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="product-title">Kişisel Bilgileri</h3>
              <p>
                <strong>İsim Soyisim :</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email : </strong>
                {order.user.email}
              </p>
              <h3 className="product-title">Adres Bilgileri</h3>
              <p>
                <strong>Adres :</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
              <p>
                <strong>Email : </strong>
                {order.user.email}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="orderTm">
                <h2>Ücret Bilgileri</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ürün :</Col>
                  <Col>${order.ItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Kargo Ücreti :</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>KDV :</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Toplam Ücret :</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ListGroup.Item>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Siparişiniz Boş</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x $ {item.price} =$
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Siparişi Al
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
