import './App.css'

const Header =(props) => {
  return <h1>Ten hoc vien {props.name} , age {props.age}, height {props.height}</h1>
}


const Products = (props) => {
  return <h1>{props.product}, gia san pham {props.value}</h1>
}
function App() {

  const hocsinh={
    name:"thinh",
    age: 90,
    height:"1m78"
  }

  const handleClick = () =>{
    const a=5;
    const b=3;
    console.log(a+b)
  }


  return (
    <div>
      <Products product={"Laptop"} value={500000000} />
      <Products product={"smartphone"} value={76700000000} />
      <Header name={hocsinh.name} age={hocsinh.age} height={hocsinh.height} />
      <button onClick={handleClick}> Click me</button>
    </div>
  )
}

export default App