import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };

    fetchProduct();
  }, []);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h3>{product.name}</h3>
            </li>
            <li className="list-group-item">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </li>
            <li className="list-group-item">Price: ${product.price}</li>
            <li className="list-group-item">
              Description: {product.description}
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Price:</div>
                  <div className="col">
                    <strong>${product.price}</strong>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Status:</div>
                  <div className="col">
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg btn-block"
                  disabled={product.countInStock == 0}
                >
                  Add to Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
