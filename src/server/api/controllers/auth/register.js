import Users from "../../models/user.js"

export const register = async (req, res) => {
  try {
    const { login, password, name, tel, email } = req.body

    if (!login || !password || !name || !tel || !email) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" })
    }

    // Проверка на существование пользователя:
    const existingUser = await Users.findOne({ where: { login } })
    if (existingUser) {
      return res.status(400).json({
        message:
          "Пользователь с таким адресом электронной почты уже существует",
      })
    }

    const newUser = await Users.create({
      login,
      password,
      name,
      tel,
      email,
    })

    newUser.save()
    console.log("User created:", newUser.toJSON())

    // Сохранение userId в cookie на 18 дней:
    res.cookie("userId", newUser.id, {
      httpOnly: true, // Кука доступна только для сервера
      maxAge: 18 * 24 * 60 * 60 * 1000, // 18 дней в миллисекундах
    })

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" })
  } catch (err) {
    console.error("Ошибка регистрации", err)
    res.status(500).json({ message: "Ошибка сервера" })
  }
}
