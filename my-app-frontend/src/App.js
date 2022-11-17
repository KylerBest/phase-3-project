import React, {useState, useEffect} from "react";
import Header from "./Header";
import Catalog from "./Catalog";
import Cart from "./Cart";
import OrderHistoryPage from "./OrderHistoryPage";
import OrderConfirmationPage from "./OrderConfirmationPage";
import CustomerPage from "./CustomerPage";

function App() {
  const [history, setHistory] = useState([])
  const [currentPage, setCurrentPage] = useState('catalog')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [focusedCustomer, setFocusedCustomer] = useState("")

  useEffect(() => {
    fetch("http://localhost:9292/startup")
      .then(r => r.json())
      .then((data) => {
        let history = {}
        for(const customer of data.customers){
          history = {...history, [customer.name]:customer.orders}
        }
        setHistory(history)
        setProducts(data.products)
      })
  }, [])

  function updateCart(product, amount){
    const updatedItemCount = (cart[product.id] ? cart[product.id].quantity : 0) + amount
    let updatedCart = {...cart, [product.id]:{...product, quantity:updatedItemCount}}
    if(updatedItemCount < 1){
      delete updatedCart[product.id]
    }
    setCart(updatedCart)
  }

  function updateHistory(order){
    const updatedRecord = {[order.customer.name]:(history[order.customer.name] ? [...(history[order.customer.name]), order] : [order])}
    const updatedHistory = {...history, ...updatedRecord}
    setHistory(updatedHistory)
  }

  function focusCustomer(name){
    if(focusedCustomer === name){
        return
    }
    setFocusedCustomer(name)
    changePage('customerPage')
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
      case 'history':
        return <OrderHistoryPage
          history={history}
          setHistory={setHistory}
          focusCustomer={focusCustomer}
          changePage={changePage}
        />
      case 'orderConfirmation':
        return <OrderConfirmationPage
          cart={cart}
          setCart={setCart}
          updateCart={updateCart}
          changePage={changePage}
          updateHistory={updateHistory}
        />
      case 'customerPage':
        return <CustomerPage
          name={focusedCustomer}
          history={history}
          setHistory={setHistory}
          focusCustomer={focusCustomer}
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
