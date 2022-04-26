import React from "react";

function Header({changePage}) {

    return (
        <header>
            <h3 onClick={() => changePage('catalog')}>Catalog</h3>
            <div className="title">
                <h1>Kyler's Online Store</h1>
                <p>A Random Assortment of Products</p>
            </div>
            <h3 onClick={() => changePage('orderHistory')}>Order History</h3>
        </header>
    )
}

export default Header