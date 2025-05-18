import express from "express"
import cookieParser from "cookie-parser"

import {
  sequelize,
  Users,
  Orders,
  Services,
} from "./src/server/api/models/index.js"

import { register } from "./src/server/api/controllers/auth/register.js"
import { login } from "./src/server/api/controllers/auth/login.js"
import { order } from "./src/server/api/controllers/order/order.js"

const app = express()
const PORT = 3000

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

// await Services.create({
//   img: "/public/img/image.png",
//   name: "общий клининг",
//   price: "8000",
// })
// await Services.create({
//   img: "/public/img/image.png",
//   name: "генеральная уборка",
//   price: "8000",
// })
// await Services.create({
//   img: "/public/img/image.png",
//   name: "послестроительная уборка",
//   price: "5000",
// })
// await Services.create({
//   img: "/public/img/image.png",
//   name: "химчистка ковров и мебели",
//   price: "10000",
// })

// await Users.create({
//   login: "adminka",
//   password: "password",
//   name: "admin",
//   tel: "+75558884545",
//   email: "admin@gmail.com",
//   role: "admin",
// })

sequelize.sync()

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)
app.post("/api/order/order", order)
// app.get("/api/auth/getOrder", getOrder)
// app.put("/api/auth/editOrder", editOrder)
// app.get("/api/auth/history", history)

await app.listen(PORT, () => {
  console.log(`Сервер работает на порту: ${PORT}`)
})
