const form = document.querySelector(".form")
const message = document.querySelector(".message")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  try {
    const login = form.querySelector('input[name="login"]').value
    const password = form.querySelector('input[name="password"]').value
    const name = form.querySelector('input[name="name"]').value
    const tel = form.querySelector('input[name="tel"]').value
    const email = form.querySelector('input[name="email"]').value

    if (!login || !password || !name || !tel || !email) {
      message.textContent = "Все поля обязательны для заполнения"
      return
    }

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
