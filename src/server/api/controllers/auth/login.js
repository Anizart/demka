import Users from "../../models/user.js"

export const login = async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" })
    }

    // Проверка роли:
    if (login === "avto2024" && password === "poehali") {
      return res.status(200).json({ message: "Добро пожаловать, админ" })
    }

    const user = await Users.findOne({ where: { login } })
    if (!user) {
      return res.status(400).json({ message: "Пользователь не был найден" })
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Неверный пароль" })
    }

    // Устанавливаю cookie на 18 дней;
    res.cookie("userId", user.id, {
      httpOnly: true,
      maxAge: 18 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ message: "С возращением" })
  } catch (err) {
    console.error("Ошибка авторизации:", err)
    return res.status(500).json({ message: "Ошибка сервера" })
  }
}
