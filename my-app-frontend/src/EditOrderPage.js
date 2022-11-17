import React from "react";

function EditOrderPage({order, setOrderItems, orderItems, closeEditMenu, onCancel}){

    function changeItemQuantity(item_id, amount){
        let changedOrderItems = orderItems
        changedOrderItems.find(itemToChange => itemToChange.id === item_id).quantity += amount
        setOrderItems([...changedOrderItems])
    }

    function saveOrderChanges(){
        fetch(`http://localhost:9292/orders/${order.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                items: orderItems
            })
        })
        .then(r => r.json())
        .then(order => {
            order.order_items.length > 0 ? setOrderItems(order.order_items) : onCancel(order)
            closeEditMenu()
        })
    }

    return (
        <div className="order-confirmation-page">
            <h1>Edit Order</h1>
            <div className="cart">
                <ul className="cart-items">
                    {orderItems.map((item, index) => 
                        <p className="cart-item" key={index}> 
                            {item.product.name} (${parseFloat(item.product.price).toFixed(2)})  <span className="amount">x{item.quantity}</span> 
                            <button className="remove-button" onClick={() => changeItemQuantity(item.id, 1)}>➕</button>
                            {item.quantity > 0 ? <button className="remove-button" onClick={() => changeItemQuantity(item.id, -1)}>➖</button> : null}
                        </p>
                    )}
                </ul>
                <h2 className="total">Total: ${parseFloat(orderItems.reduce((total, item) => total + item.product.price * item.quantity, 0)).toFixed(2)}</h2>
                <form className="name-form">
                    <input 
                        className="enter-name" 
                        id="name" 
                        type="text"
                        value={order.customer.name}
                        disabled={true}
                    />
                </form>
                <button onClick={saveOrderChanges} disabled={orderItems.length < 1} className="order-button">
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default EditOrderPage