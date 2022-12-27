import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../component/Rating";
import "../my.css";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import Message from "../component/Message";
import {
  ListProduct,
  ListProductDetails,
  deleteProduct,
  createProduct,
} from "../actions/productListAction";
import { LinkContainer } from "react-router-bootstrap";

function ProductListScreen() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    if (successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(ListProduct());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createProduct,
    createdProduct,
  ]);
  const deleteHandler = (id) => {
    if (window.confirm("Silmek İstediğine Emin Misin?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row>
        <Col md={10}>
          <h2>Ürünler</h2>
        </Col>
        <Col md={2} className="tex-right">
          <Button onClick={createProductHandler} className="my-3">
            <i className="fas fa-plus"></i>
            Ürün Ekle
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>İsim</th>
                <th>Fiyat</th>
                <th>Kategori</th>
                <th>Marka</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to="/">
                      <Button>
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
