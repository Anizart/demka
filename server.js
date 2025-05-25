import express from "express"
import cookieParser from "cookie-parser"

import { sequelize, Users, Orders } from "./src/server/api/models/index.js"

import { register } from "./src/server/api/controllers/auth/register.js"
import { login } from "./src/server/api/controllers/auth/login.js"
import { order } from "./src/server/api/controllers/order/order.js"
import { getOrder } from "./src/server/api/controllers/order/getOrder.js"
import { getAllOrders } from "./src/server/api/controllers/admin/getAllOrders.js"

const app = express()
const PORT = 3000

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

// await Users.create({
//   login: "avto2024",
//   password: "poehali",
//   name: "admin",
//   tel: "+75558884545",
//   email: "admin@gmail.com",
//   role: "admin",
// })

sequelize.sync()

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)
app.post("/api/order/order", order)
app.get("/api/order/getOrder", getOrder)
app.get("/api/admin/getAllOrders", getAllOrders)
// app.put("/api/auth/editOrder", editOrder)

await app.listen(PORT, () => {
  console.log(`Сервер работает на порту: ${PORT}`)
})
