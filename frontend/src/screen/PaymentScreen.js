import CheckOutSteps from "../component/CheckOutSteps";
import FormContainer from "../component/FormContainer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import { Button, Form } from "react-bootstrap";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const history = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("pay");
  if (!shippingAddress.address) {
    history("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history("/placeorder");
  };
  return (
    <div>
      <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h2 className="nav-color">Adres Bilgilerim</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Ödeme Yöntemi Seçiniz</Form.Label>
            <Form.Check
              type="radio"
              label="Kredi Kartı"
              id="pay"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" variant="warning">
            Güncelle
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PaymentScreen;
