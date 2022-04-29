import React, {useState, useEffect} from "react";

function EditOrderPage({order}){

    useEffect(() => {
        console.log(order)
    }, [])

    const [orderItems, setOrderItems] = useState(order.order_items.map(item => {
        return {...item.product, id: item.id, quantity: item.quantity}
    }))
    return (
        <div className="order-confirmation-page">
            <h1>Edit Order</h1>
            <div className="cart">
                <ul className="cart-items">
                    {orderItems.map((item, index) => 
                        <p className="cart-item" key={index}> <button className="remove-button">❌</button>
                            {item.name} (${parseFloat(item.price).toFixed(2)})  <span className="amount">x{item.quantity}</span> 
                        </p>
                    )}
                </ul>
                <h2 className="total">Total: ${parseFloat(orderItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</h2>
                <form className="name-form">
                    <input 
                        className="enter-name" 
                        id="name" 
                        type="text"
                        value={order.customer.name}
                        disabled={true}
                    />
                </form>
                <button disabled={orderItems.length < 1} className="order-button">
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default EditOrderPage