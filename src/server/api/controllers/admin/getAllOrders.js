import Orders from "../../models/order.js"

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll()

    return res.status(200).json(orders)
  } catch (err) {
    console.error("Ошибка:", err)
    res.status(500).json({ message: "Ошибка сервера" })
  }
}
