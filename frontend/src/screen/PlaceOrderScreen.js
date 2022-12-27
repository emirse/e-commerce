import CheckOutSteps from "../component/CheckOutSteps";
import FormContainer from "../component/FormContainer";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { ORDER_CREATE_RESET } from "../constans/orderConstans";
import { createOrder } from "../actions/orderAction";

function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);

  cart.ItemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.ItemsPrice > 100 ? 1 : 10).toFixed(2);
  cart.taxPrice = Number(0.088 * cart.ItemsPrice).toFixed(2);

  cart.totalPrice =
    Number(cart.ItemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const history = useNavigate();

  if (!cart.paymentMethod) {
    history("/shipping");
  }
  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history]);
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
        paymentMethod: cart.paymentMethod,
        ItemsPrice: cart.ItemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  console.log(cart.shippingPrice);
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="orderTm">
              <h2>Sipariş Bilgileri</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Adres :</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item className="orderTm">
              <h2>Ödeme Bilgileri</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item className="orderTm">
              <h2>Sepetim</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Sepetiniz Boş</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image width={200}
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
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="orderTm">
                <h2>Alışverişi Tamamla</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ürün :</Col>
                  <Col>${cart.ItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Kargo Ücreti :</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>KDV :</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Toplam Ücret :</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={placeOrder}
                  disabled={cart.Items === 0}
                  type="button"
                  variant="warning"
                >
                  Siparişi Tamamla
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>{" "}
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
