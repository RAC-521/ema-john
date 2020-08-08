import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Products/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {
    const first20 = fakeData.slice(0,20);
    const [products, setProducts] = useState(first20);
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(
                            pd => <Product 
                            key={pd.key}
                            showAddToCart={true} 
                            showBack={false}
                            product={pd} 
                            addToCart={handleAddToCart}>
                            </Product>
                        )
                    }
                </ul>
            </div>
            <div className="cart-container"> 
                <Cart cart={cart} showReview={true} ></Cart>
            </div>
        </div>
    );
};

export default Shop;