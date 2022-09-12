import React, {useState, useEffect} from "react";
import Header from "./Header";
import Catalog from "./Catalog";
import Cart from "./Cart";
import OrderHistoryPage from "./OrderHistoryPage";
import OrderConfirmationPage from "./OrderConfirmationPage";

function App() {

  const [currentPage, setCurrentPage] = useState('catalog')
  const [orderHistory, setOrderHistory] = useState([])
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/products")
      .then(r => r.json())
      .then(products => {
        setProducts(products)
        fetch("http://localhost:9292/orders")
          .then(r => r.json())
          .then(setOrderHistory)
        })
      .catch(() => alert("ERROR: no connection"))
  }, [])

  function modifyCart(product, increaseItem){
    const index = cartItems.findIndex(item => item.id === product.id)
    if(index === -1 && increaseItem){
      setCartItems([...cartItems, {...product, quantity: 1}])
      return
    }
    let newCart = [...cartItems]
    if(increaseItem){
      newCart[index].quantity++
      setCartItems(newCart)
    }else{
      setCartItems(cartItems.filter(item => item.id !== product.id))
    }
  }

  function onOrder({customer_name}){
    let getCustomer = null

    function createOrder(){
      fetch('http://localhost:9292/orders', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          customer_id: getCustomer.id
        })
      })
        .then(r => r.json())
        .then(order => {
          for(const item of cartItems){
            fetch('http://localhost:9292/order_items', {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                product_id: item.id,
                order_id: order.id,
                quantity: item.quantity
              })
            })
              .then(() => {
                setCartItems([])
                changePage()
              })
          }
        })
    }

    fetch(`http://localhost:9292/customers/${customer_name}`)
      .then(r => r.json())
      .then(customer => {
        if(customer){
          getCustomer = customer
          createOrder()
        }
        else {
          fetch("http://localhost:9292/customers", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              name: customer_name
            })
          })
            .then(r => r.json())
            .then(newCustomer => {
              getCustomer = newCustomer
              createOrder()
            })
        }
      })
  }

  function cancelOrder(order_id){
    fetch(`http://localhost:9292/orders/${order_id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(deletedOrder => {
        for(const order_item of deletedOrder.order_items){
          fetch(`http://localhost:9292/order_items/${order_item.id}`, {
            method: "DELETE"
          })
        }
      })
      .then(setOrderHistory(orderHistory.filter(order => order.id !== order_id)))
      .catch(() => alert("ERROR: no connection"))
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
            modifyCart={modifyCart}
          />
          <Cart
            changePage={changePage}
            modifyCart={modifyCart}
            cartItems={cartItems}
          />
        </div>
      case 'orderHistory':
        return <OrderHistoryPage
          setOrderHistory={setOrderHistory}
          orderHistory={orderHistory}
          changePage={changePage}
          cancelOrder={cancelOrder}
        />
      case 'orderConfirmationPage':
        return <OrderConfirmationPage
          cartItems={cartItems}
          modifyCart={modifyCart}
          onOrder={onOrder}
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
