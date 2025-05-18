import Orders from "../../models/order.js"
import Services from "../../models/services.js"

export const order = async (req, res) => {
  try {
    const userId = req.cookies.userId

    if (!userId) {
      return res.status(401).json({ message: "Вы не авторизованы" })
    }

    const { address, tel, data, time, service, payment } = req.body

    if (!address || !tel || !data || !time || !service || !payment) {
      return res.status(400).json({ message: "Все поля обязательны" })
    }

    // Найти услугу по названию
    const foundService = await Services.findOne({ where: { name: service } })

    if (!foundService) {
      return res.status(400).json({ message: "Указанная услуга не найдена" })
    }

    const newOrder = await Orders.create({
      userId,
      serviceId: foundService.id,
      address,
      tel,
      data,
      time,
      payment,
      status: "новая заявка",
    })

    res.status(201).json({ message: "Заявка успешно создана" })
  } catch (err) {
    console.error("Ошибка при создании заказа:", err)
    res.status(500).json({ message: "Ошибка сервера" })
  }
}
