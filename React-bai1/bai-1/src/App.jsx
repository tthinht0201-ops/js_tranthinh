import './App.css'
import Products from './component/Products'

// const Products = (props) => {
//   return <h1>{props.product}, gia san pham {props.value}</h1>
// }
// function App() {

// const hocsinh={
//   name:"thinh",
//   age: 90,
//   height:"1m78"
// }

// const handleClick = () =>{
//   const a=5;
//   const b=3;
//   console.log(a+b)
// }


//  return (
//    <div>
//      <Products product={"Laptop"} value={500000000} />
//      <Products product={"smartphone"} value={76700000000} />
//      <Header name={hocsinh.name} age={hocsinh.age} height={hocsinh.height} />
//      <button onClick={handleClick}> Click me</button>
//    </div>
//  )
//}

function App() {
  const products = [
    { product: "iPHONE 14 PRO MAX", value: 1000 },
    { product: "MacBook Pro 16 inch", value: 2500 },
    { product: "Apple Watch series 7", value: 500 }
  ]

  return (
    <>
      {
        products.map((item) => {
        return <Products name={item.product} value={item.value} />
      })
    }
    </>
  )
}

export default App