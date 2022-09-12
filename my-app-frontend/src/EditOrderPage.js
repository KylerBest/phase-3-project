import React from "react";

function EditOrderPage({order, setOrderItems, orderItems, closeEditMenu, cancelOrder}){

    function changeItemQuantity(item_id, increase){
        let changedOrderItems = orderItems
        changedOrderItems.find(itemToChange => itemToChange.id === item_id).quantity += increase? 1 : -1
        setOrderItems([...changedOrderItems])
    }

    function saveChanges(){
        for(const item of orderItems){
            if(item.quantity > 0) {
                fetch(`http://localhost:9292/order_items/${item.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        quantity: item.quantity
                    })
                })
                .then(() => closeEditMenu())
            }else {
                fetch(`http://localhost:9292/order_items/${item.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    setOrderItems(orderItems.filter(i => i.id !== item.id))
                    closeEditMenu()
                })
            }
        }
        if(orderItems.filter(i => i.quantity === 0).length === orderItems.length) 
        {
            cancelOrder(order.id)
        }
    }

    return (
        <div className="order-confirmation-page">
            <h1>Edit Order</h1>
            <div className="cart">
                <ul className="cart-items">
                    {orderItems.map((item, index) => 
                        <p className="cart-item" key={index}> 
                            {item.product.name} (${parseFloat(item.product.price).toFixed(2)})  <span className="amount">x{item.quantity}</span> 
                            <button className="remove-button" onClick={() => changeItemQuantity(item.id, true)}>➕</button>
                            {item.quantity > 0 ? <button className="remove-button" onClick={() => changeItemQuantity(item.id, false)}>➖</button> : null}
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
                <button onClick={saveChanges} disabled={orderItems.length < 1} className="order-button">
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default EditOrderPage