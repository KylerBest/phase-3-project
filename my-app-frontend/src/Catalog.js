import React from "react";

function Catalog({products, updateCart}) {
    return (
        <div className="catalog">
            <h1>Catalog</h1>
            <div className="container">
                {products.map(product =>
                    <div className="product-listing" key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                        <p>category: {product.category}</p>
                        <button 
                            className="add-to-cart-button"
                            onClick={() => updateCart(product, 1)}
                        >Add to Cart</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Catalog