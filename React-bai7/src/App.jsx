import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const raw = await fetch('https://fakestoreapi.com/products')//https://fakestoreapi.com/products
      const result = await raw.json()

      console.log("result:", result)
      setProducts(result)
    }

    fetchProducts()
  }, [])

  console.log("products: ", products)

  return (
    <>
      {products.map((item) => {
        return <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <img src={item.image} alt="" />
        </div>
      })}
    </>
  )
}

export default App