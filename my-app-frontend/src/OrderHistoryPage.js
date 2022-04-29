import React from "react";
import OrderListing from "./OrderListing";

function OrderHistoryPage({orderHistory, cancelOrder}){

    return (
        <>
            <h1>Order History</h1>
            <div className="order-history">
                {
                    orderHistory.map(order => 
                        <OrderListing 
                            key={order.id}
                            order={order}
                        />
                    )
                }
            </div>
        </>
    )
}

export default OrderHistoryPage