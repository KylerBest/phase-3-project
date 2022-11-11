import React from "react";

function Cart({changePage, cart, updateCart}) {
    return (
        <div className="cart">
            <h1>Cart</h1>
            <ul className="cart-items">
                {Object.values(cart).map((product) => 
                    <p key={product.id} className="cart-item"> 
                        <button className="remove-button" onClick={() => updateCart(product, -1)}>➖</button>
                        <button className="remove-button" onClick={() => updateCart(product, 1)}>➕</button>
                        {product.name} <span className="amount">x{product.quantity}</span> 
                    </p>
                )}
            </ul>
            <h2 className="total">Total: ${parseFloat(Object.values(cart).reduce((total, product) => total + product.price * product.quantity, 0)).toFixed(2)}</h2>
            <button disabled={cart.length < 1} className="order-button" onClick={() => changePage('orderConfirmation')}>Checkout</button>
        </div>
    )
}

export default Cart