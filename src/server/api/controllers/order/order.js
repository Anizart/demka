import Orders from "../../models/order.js"

export const order = async (req, res) => {
  try {
    const userId = req.cookies.userId

    if (!userId) {
      return res.status(401).json({ message: "Вы не авторизованы" })
    }

    const {
      address,
      tel,
      data,
      time,
      series,
      number,
      dateIssue,
      brand,
      model,
      payment,
    } = req.body

    if (
      !address ||
      !tel ||
      !data ||
      !time ||
      !series ||
      !number ||
      !dateIssue ||
      !brand ||
      !model ||
      !payment
    ) {
      return res.status(400).json({ message: "Все поля обязательны" })
    }

    const newOrder = await Orders.create({
      userId,
      address,
      tel,
      data,
      time,
      series,
      number,
      dateIssue,
      brand,
      model,
      payment,
      status: "новая заявка",
    })

    res.status(201).json({ message: "Заявка успешно создана" })
  } catch (err) {
    console.error("Ошибка при создании заказа:", err)
    res.status(500).json({ message: "Ошибка сервера" })
  }
}
