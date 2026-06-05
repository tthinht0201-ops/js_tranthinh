import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Homepage'
import Contact from '../pages/Contact'
import Product from '../pages/Products'


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home />,
        errorElement:<h1>error 404</h1>
    },

    {
    
        path:"/contact",
        element:<Contact />
    }
    ,
    {
        path:"/product",
        element:<Product />
    }
])