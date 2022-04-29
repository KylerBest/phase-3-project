import React from "react";

function Cart({changePage, cartItems, modifyCart}) {
    return (
        <div className="cart">
            <h1>Cart</h1>
            <ul className="cart-items">
                {cartItems.map(item => 
                    <p key={item.id} className="cart-item"> 
                        <button className="remove-button" onClick={() => modifyCart(item, false)}
                            >❌</button> {item.name} <span className="amount">x{item.quantity}</span> 
                    </p>
                )}
            </ul>
            <h2 className="total">Total: ${parseFloat(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</h2>
            <button disabled={cartItems.length < 1} className="order-button" onClick={() => changePage('orderConfirmationPage')}>Checkout</button>
        </div>
    )
}

export default Cart