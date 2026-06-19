import { useReducer } from "react";

const initialState = {
  cart: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export default function App(){
  const[state,dispatch] = useReducer(cartReducer,initialState)
  const PRODUCTS =[
    {id:1, name:"laptop",quantity:3},
    {id:2, name:"pc",quantity:3},
    {id:3, name:"mouse",quantity:3},

  ];

  return (
    <div>
      <h1>Products</h1>
      {PRODUCTS.map((product) =>(
        <div key ={product.id}>
          {product.name}
          <button onClick={() => {
            dispatch({
              type:"ADD_TO_CART",
              payload: product,
            })
          }}>ADD_TO_CART</button>
        </div>
      ))}

      <h2> cart</h2>
      {state.cart.length ===0 ? (
        <p>cart is empty</p>
      ):(
        state.cart.map((item) => (
          <div key={item.id}>
            {item.name}
            <button onClick={() => dispatch({
              type:"REMOVE_FROM_CART",
              payload: item.id,
            })}>remove</button>
          </div>
        ))
      )}
    </div>
  );

}