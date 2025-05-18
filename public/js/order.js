const form = document.querySelector(".form")
const message = document.querySelector(".message")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  try {
    const address = form.querySelector('input[name="address"]').value
    const tel = form.querySelector('input[name="tel"]').value
    const data = form.querySelector('input[name="data"]').value
    const time = form.querySelector('input[name="time"]').value
    const service = form.querySelector('input[name="service"]').value
    const payment = form.querySelector('input[name="payment"]').value

    if (!address || !tel || !data || !time || !service || !payment) {
      message.textContent = "Все поля обязательны для заполнения"
      return
    }

    const orderData = {
      address,
      tel,
      data,
      time,
      service,
      payment,
    }

    const res = await fetch("/api/order/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    const dataRes = await res.json()

    if (res.ok) {
      message.textContent = dataRes.message
      form.reset()

      setTimeout(() => {
        window.location.href = "/pages/main.html"
      }, 1000)
    } else {
      message.textContent = dataRes.message
    }
  } catch (err) {
    message.textContent = "Ошибка сервера."
    console.error("Ошибка сервера:", err)
  }
})
