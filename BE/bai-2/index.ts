import express, { request } from "express";

const server = express()

server.use(express.json())

let products = [{
    id: 1,
    name: "iphone",
    price: 2000
}, {
    id: 2,
    name: "ipad",
    price: 3000
}]

server.get("/products", (req, res) => {
    res.json(products)
})

server.post("/products", (req, res) => {
    const body = req.body
    console.log("body:", body)
    products.push({
        ...body,
        id: products.length + 1
    })
    res.json({
        message: "successfully create"
    })
})

server.put("/products/:productId", (req, res) => {
    const body = req.body
    const productId = req.params.productId

    products = products.map((item) => {
        if (item.id === parseInt(productId)) {
            return {
                ...body,
                id: item.id
            }
        }
    })
    res.json({
        message: "update successfully",
    })
})

server.delete("/products/:productId", (req, res) => {
    const productId = req.params.productId

    if (!products.find((item) => item.id === parseInt(productId)))

        products = products.filter((item) => {
            if (item.id === parseInt(productId)) {
                return false
            }
            return true
        })
    res.json({
        message: "deleted successfully",
    })
})

server.listen(3000, () => {
    console.log("server started at port 3000")
})