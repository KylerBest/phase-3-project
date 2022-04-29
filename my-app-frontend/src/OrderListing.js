import React, {useState} from "react";
import EditOrderPage from "./EditOrderPage";

function OrderListing({order, cancelOrder}){

    const [isShowingEditMenu, setIsShowingEditMenu] = useState(false)

    return (
        <div>
            <ul className="order">
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
                <button className="edit-order-button" onClick={() => setIsShowingEditMenu(true)}>Edit Order</button>
            </ul>
            <div className={isShowingEditMenu ? 'edit-order-menu' : 'edit-order-menu hide'}>
                <h3 
                    className="back-button"
                    onClick={() => setIsShowingEditMenu(false)}
                >Back</h3>
                <EditOrderPage
                    order={order}
                />
            </div>
        </div>
    )
}

export default OrderListing