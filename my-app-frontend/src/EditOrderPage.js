import React, {useState} from "react";

function EditOrderPage({order, closeEditMenu}){
    
    const originalOrder = order.order_items.map(item => {
        return {...item.product, id: item.id, quantity: item.quantity}
    })
    
    const [orderItems, setOrderItems] = useState(originalOrder)

    function cancelChanges(){
        setOrderItems(originalOrder)
        closeEditMenu()
    }

    function changeItemQuantity(item_id, increase){
        let changedOrder = orderItems
        changedOrder.find(itemToChange => itemToChange.id === item_id).quantity += increase? 1 : -1
        setOrderItems([...changedOrder])
    }

    return (
        <div className="order-confirmation-page">
            <h3 className="back-button" onClick={() => cancelChanges()}>Back</h3>
            <h1>Edit Order</h1>
            <div className="cart">
                <ul className="cart-items">
                    {orderItems.map((item, index) => 
                        <p className="cart-item" key={index}> 
                            {item.name} (${parseFloat(item.price).toFixed(2)})  <span className="amount">x{item.quantity}</span> 
                            {item.quantity > 0 ? <button className="remove-button" onClick={() => changeItemQuantity(item.id, false)}>➖</button> : null}
                            <button className="remove-button" onClick={() => changeItemQuantity(item.id, true)}>➕</button>
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