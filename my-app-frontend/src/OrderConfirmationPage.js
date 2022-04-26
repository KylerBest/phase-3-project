import React, {useState} from "react";

function OrderConfirmationPage({cartItems, modifyCart, onOrder}){
    const [name, setName] = useState("")
    return (
        <div className="order-confirmation-page">
            <h1>Confirm Order</h1>
            <div className="cart">
                <h1>Cart</h1>
                <ul className="cart-items">
                    {cartItems.map(item => 
                        <p key={item.id} className="cart-item"> 
                            <button className="remove-button" onClick={() => modifyCart(item, false)}>❌</button>
                            {item.name} (${parseFloat(item.price).toFixed(2)})  <span className="amount">x{item.quantity}</span> 
                        </p>
                    )}
                </ul>
                <h2 className="total">Total: ${parseFloat(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</h2>
                <form className="name-form" onSubmit={e => e.preventDefault()}>
                    <label 
                        className="label"
                        htmlFor="name">
                            Enter Name:
                    </label>
                    <input 
                        className="enter-name" 
                        id="name" 
                        type="text"
                        placeholder="Name Required"
                        disabled={cartItems.length < 1}
                        onChange={e => setName(e.target.value)}
                    />
                </form>
            </div>
            <button 
                disabled={name.length < 1 || cartItems.length < 1} 
                className="order-button"
                onClick={() => onOrder({customer_name: name})}
            >
                Confirm and Place Order
            </button>
        </div>
    )
}

export default OrderConfirmationPage