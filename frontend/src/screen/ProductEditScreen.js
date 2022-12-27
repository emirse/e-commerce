import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Message from "../component/Message";
import FormContainer from "../component/FormContainer";
import Loader from "../component/Loader";
import { USER_UPDATE_RESET } from "../constans/UserConstans";
import { getUserDetails, updateUser } from "../actions/userAction";
import { PRODUCT_UPDATE_SUCCESS } from "../constans/productConstans";
import {
  ListProductDetails,
  updateProduct,
} from "../actions/productListAction";
import axios from "axios";
function ProductEditScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_id", id);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `/api/products/upload/`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_SUCCESS });
      history("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(ListProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, history, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      {" "}
      <div>
        <Link to="/admin/userList">Geri</Link>
        <FormContainer>
          <h1>Ürün Düzenle</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>İsim</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ürün İsmi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Fiyat</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Fiyat Giriniz"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Resim</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Resim Giriniz"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Marka</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Marka Giriniz"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Kategori Giriniz"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Stok</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Stok Giriniz"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Açıklama</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Açıklama Giriniz"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <br></br>
              <Button type="submit" variant="warning">
                Güncelle
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    </div>
  );
}

export default ProductEditScreen;
