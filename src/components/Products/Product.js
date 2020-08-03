import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {name, img, price, seller, stock} = props.product;
    return (
        <div className='product'>
            <div className='product-image'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h4 className='product-name'>{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock- order soon</small></p>
                <button className="addToCartBtn" onClick={() => props.addToCart(props.product)}> 
                    <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;