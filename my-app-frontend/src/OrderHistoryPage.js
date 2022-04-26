import React from "react";

function OrderHistoryPage({orderHistory, cancelOrder}){
    return (
        <>
            <h1>Order History</h1>
            <ul className="order-history">
                {
                    orderHistory.map(order => 
                    <ul key={order.id} className="order">
                        <h3>Customer: {order.customer.name}</h3>
                        <h3>Items:</h3>
                        {
                            order.order_items.map(item => 
                                <li key={item.product.name}>{item.product.name} | ${parseFloat(item.product.price).toFixed(2)} | x{item.quantity}</li>)
                        }
                        <h3>Total: ${parseFloat(order.order_items.reduce(
                            (total, item) => total + item.product.price * item.quantity, 0)).toFixed(2)}
                        </h3>
                        <button className="cancel-order-button" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                    </ul>)
                }
            </ul>
        </>
    )
}

export default OrderHistoryPage