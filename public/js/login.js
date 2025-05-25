const form = document.querySelector(".form")
const message = document.querySelector(".message")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  try {
    let login = form.querySelector('input[name="login"]').value
    let password = form.querySelector('input[name="password"]').value

    if (!login || !password) {
      message.textContent = "Все поля обязательны для заполнения"
      return
    }

    const userData = {
      login,
      password,
    }

    const res = await fetch("/api/auth/login", {
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

      if (login === "avto2024" && password === "poehali") {
        setTimeout(() => {
          message.textContent = ""
          window.location.href = "/pages/adminka.html"
        }, 1000)
      } else {
        setTimeout(() => {
          message.textContent = ""
          window.location.href = "/pages/main.html"
        }, 1000)
      }
    } else {
      message.textContent = data.message
    }
  } catch (err) {
    message.textContent = "Ошибка сервера."
    console.error("Ошибка:", err)
  }
})
