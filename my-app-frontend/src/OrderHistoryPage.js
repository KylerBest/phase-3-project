import React, {useState, useEffect} from "react";
import OrderListing from "./OrderListing";

function OrderHistoryPage({history, setHistory, focusCustomer}){

    const orders = Object.values(history).flat(1)

    function onCancel(order){
        let newRecord = {[order.customer.name]:history[order.customer.name].filter(o => o.id !== order.id)}
        setHistory({...history, ...newRecord})
    }

    function cancelOrder(id){
        fetch(`http://localhost:9292/orders/${id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(order => {
                onCancel(order)
            })
    }

    return (
        <>
            <h1>Order History</h1>
            <div className="order-history">
                {
                    orders.map(order => 
                        <OrderListing 
                            key={order.id}
                            order={order}
                            cancelOrder={cancelOrder}
                            history={history}
                            onCancel={onCancel}
                            focusCustomer={focusCustomer}
                        />
                    )
                }
            </div>
        </>
    )
}

export default OrderHistoryPage