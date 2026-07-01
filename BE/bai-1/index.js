const http = require("http")

let products = [{
    id: 1,
    product: "ipad",
    value: 200000
}, {
    id: 2,
    product: "iphone",
    value: 400000
}]

const students = [{
    id: 1,
    name: "thinh",
    age: 10
}, {
    id: 2,
    name: "thu",
    age: 12
}]

const teachers = [{
    id: 1,
    name: "thinh",
    age: 40,
    role: "teacher"
}, {
    id: 2,
    name: "thu",
    age: 30,
    role: "teacher"
}]

const server = http.createServer((req, res) => {
    if (req.url === "/products" && req.method === "GET") {
        res.end(JSON.stringify(products))
        return;
    }
    if (req.url === "/products" && req.method === "POST") {

        let body = "";
        req.on("data", chunk => body += chunk);
        req.end("end", () => {
            const newProduct = JSON.parse(body)
            products.push({
                ...newProduct,
                id: products.length + 1
            })
            res.end(JSON.stringify(products))

        })
        return;
    }
    if (req.url.startsWith("/products") && req.method === "PUT") {
        const id = parseInt(req.url.split("/")[2])
        let body = "";

        if (!products.find((item) => item.id === id)) {
            res.end("can't found the target product!")
            return;
        }

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const parseBody = JSON.parse(body)
                products = products.map((item) => {
                    if (item.id === id) {
                        return {
                            ...parseBody,
                            id: id
                        }
                    }
                    return item
                })
                res.end("successfully update!")
            }
            catch (e) {
                res.end("something went wrong!")
            }
        })
        return;
    }
    if (req.url === "/products" && req.method === "DELETE") {
        const id = parseInt(req.url.split("/")[2])

        if (!products.find((item) => item.id === id)) {
            res.end("can't found the target product!")
            return;
        }

        products = products.filter((item) => item.id !== id)
        res.end("successfully delete")
        return;
    }
    if (req.url === "/teachers") {
        res.end(JSON.stringify(teachers))
        return;
    }
    if (req.url === "/students") {
        res.end(JSON.stringify(students))
        return;
    }
    res.end("not found")
})

server.listen(3000)