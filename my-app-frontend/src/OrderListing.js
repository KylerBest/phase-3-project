import React, {useState} from "react";
import EditOrderPage from "./EditOrderPage";

function OrderListing({order, cancelOrder}){

    const [isShowingEditMenu, setIsShowingEditMenu] = useState(false)
    const [orderItems, setOrderItems] = useState(order.order_items)

    function closeEditMenu(){
        setIsShowingEditMenu(false)
    }

    return (
        <div>
            <ul className="order">
                <h3>Customer: {order.customer.name}</h3>
                <h3>Items:</h3>
                {
                    orderItems.map(item =>
                        <li key={item.product.name}>{item.product.name} | ${parseFloat(item.product.price).toFixed(2)} | x{item.quantity}</li>)
                    }
                <h3>Total: ${parseFloat(order.order_items.reduce(
                    (total, item) => total + item.product.price * item.quantity, 0)).toFixed(2)}
                </h3>
                <button className="cancel-order-button" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                <button className="edit-order-button" onClick={() => setIsShowingEditMenu(true)}>Edit Order</button>
            </ul>
            <div className={isShowingEditMenu ? 'edit-order-menu' : 'edit-order-menu hide'}>
                <EditOrderPage
                    order={order}
                    setOrderItems={setOrderItems}
                    orderItems={orderItems}
                    closeEditMenu={closeEditMenu}
                />
            </div>
        </div>
    )
}

export default OrderListing