import React, {useState, useEffect} from "react";
import Header from "./Header";
import Catalog from "./Catalog";
import Cart from "./Cart";
import OrderHistoryPage from "./OrderHistoryPage";
import OrderConfirmationPage from "./OrderConfirmationPage";

function App() {

  const [currentPage, setCurrentPage] = useState('catalog')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  useEffect(() => {
    fetch("http://localhost:9292/products")
      .then(r => r.json())
      .then(setProducts)
      .catch(() => alert("ERROR: could not connect"))
  }, [])

  function updateCart(product, amount){
    let updatedItemCount = (cart[product.id] ? cart[product.id].quantity : 0) + amount
    let updatedCart = {...cart, [product.id]:{...product, quantity:updatedItemCount}}
    if(updatedItemCount < 1){
      delete updatedCart[product.id]
    }
    setCart(updatedCart)
  }

  function changePage(page){
    setCurrentPage(page)
  }

  const page = () => {
    switch(currentPage){
      default:
        return <div className="main">
          <Catalog
            products={products}
            updateCart={updateCart}
          />
          <Cart
            cart={cart}
            updateCart={updateCart}
            changePage={changePage}
          />
        </div>
      case 'orderHistory':
        return <OrderHistoryPage/>
      case 'orderConfirmation':
        return <OrderConfirmationPage
          cart={cart}
          setCart={setCart}
          updateCart={updateCart}
          changePage={changePage}
        />
    }
  }

  return (
    <>
      <Header
        changePage={changePage}
      />
      {
        page()
      }
    </>
  );
}

export default App;
