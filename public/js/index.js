const form = document.querySelector(".form")
const message = document.querySelector(".message")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  try {
    let login = form.querySelector('input[name="login"]').value
    let password = form.querySelector('input[name="password"]').value
    let name = form.querySelector('input[name="name"]').value
    let tel = form.querySelector('input[name="tel"]').value
    let email = form.querySelector('input[name="email"]').value

    if (!login || !password || !name || !tel || !email) {
      message.textContent = "Все поля обязательны для заполнения"
      return
    }

    if (login.length < 6) {
      message.textContent = "Логин Должен быть не менее 6 символов!"
      return
    }

    if (password.length < 6) {
      message.textContent = "Пароль должен быть не менее 6 символов!"
      return
    }

    // const phoneRegex = /^\+7$$\d{3}$$-\d{3}-\d{2}-\d{2}$/
    // if (!phoneRegex.test(tel)) {
    //   message.textContent = "Телефон должен быть в формате +7(XXX)-XXX-XX-XX"
    //   return
    // }

    const userData = {
      login,
      password,
      name,
      tel,
      email,
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await res.json()

    if (res.ok) {
      message.textContent = data.message
      form.reset()

      setTimeout(() => {
        window.location.href = "/pages/main.html"
      }, 1000)
    } else {
      message.textContent = data.message
    }
  } catch (err) {
    message.textContent = "Ошибка сервера."
  }
})
