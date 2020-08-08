import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Products/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first20 = fakeData.slice(0,20);
    const [products, setProducts] = useState(first20);
    const [cart, setCart] = useState([]);
    const handleAddToCart = (product) => {
        console.log('Product added to cart', product);
        const newCart = [...cart, product];
        setCart(newCart); 
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(
                            pd => <Product showAddToCart={true} product={pd} addToCart={handleAddToCart}></Product>
                        )
                    }
                </ul>
            </div>
            <div className="cart-container"> 
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;