import React from 'react';
import './Review.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import giphy from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    let showGiphy;
    if(orderPlaced === true){
        showGiphy = <img src={giphy} alt=""/>
    }

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(cartProducts);
    }, [])
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    cart.map( pd => <ReviewItem 
                        key = {pd.key}
                        removeItem = {handleRemoveItem}
                        product={pd}></ReviewItem>)
                }
                { showGiphy } 
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="addToCartBtn" onClick={handlePlaceOrder}>Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;