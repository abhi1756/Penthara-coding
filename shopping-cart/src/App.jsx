import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const items = [
    { id: 1, name: 'Mango', price: 80 },
    { id: 2, name: 'Banana', price: 40 },
    { id: 3, name: 'Grapes', price: 100 },
  ]

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div>
      <h1>Shopping Cart</h1>

      <div>
        <div>
          <h2>Products</h2>

          {items.map((item) => (
            <div className="product-card" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>
              </div>

              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price} each</p>
                  <p>
                    Subtotal: {item.price * item.quantity}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    label={`Remove one ${item.name}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => addToCart(item)}
                    label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <div>
            <p>
              Total Items: <strong>{totalItems}</strong>
            </p>

            <h3>
              Total: Rs. <span>{totalPrice}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
