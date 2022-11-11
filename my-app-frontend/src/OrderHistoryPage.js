import React, {useState, useEffect} from "react";
import OrderListing from "./OrderListing";

function OrderHistoryPage(){
    
    const [orderHistory, setOrderHistory] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/orders")
            .then(r => r.json())
            .then(setOrderHistory)
            .catch(() => alert("ERROR: could not connect"))
    }, [])

    function cancelOrder(id){
        fetch(`http://localhost:9292/orders/${id}`, {
            method: 'DELETE'
        })
            .then(setOrderHistory(orderHistory.filter(order => order.id !== id)))
    }

    return (
        <>
            <h1>Order History</h1>
            <div className="order-history">
                {
                    orderHistory.map(order => 
                        <OrderListing 
                            key={order.id}
                            order={order}
                            cancelOrder={cancelOrder}
                        />
                    )
                }
            </div>
        </>
    )
}

export default OrderHistoryPage