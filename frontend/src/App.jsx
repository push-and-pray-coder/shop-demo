import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])

/* Vanilla http test
useEffect(() => {
    fetch('/api/test/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(error))
  }, [])
*/

  useEffect(() => {
    fetch('/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <h1>Products</h1>

      {products.map(product => (
        <div key={product.id}>
          <p>{product.name} - ${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default App

