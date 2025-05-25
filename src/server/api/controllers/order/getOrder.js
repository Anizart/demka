import Orders from "../../models/order.js"

export const getOrder = async (req, res) => {
  try {
    const userId = req.cookies.userId

    if (!userId) {
      return res.status(401).json({ message: "Пользователь не авторизован" })
    }

    const order = await Orders.findAll({ where: { userId: userId } })

    res.status(200).json(order)
  } catch (err) {
    console.error("Ошибка:", err)
    res.status(500).json({ message: "Ошибка сервера" })
  }
}
