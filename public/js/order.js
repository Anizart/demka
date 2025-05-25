const form = document.querySelector(".form")
const message = document.querySelector(".message")
const checkbox = document.getElementById("agreement")
const button = document.querySelector(".btn")

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    button.disabled = false
  } else {
    button.disabled = true
  }
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  try {
    let address = form.querySelector('input[name="address"]').value
    let tel = form.querySelector('input[name="tel"]').value
    let data = form.querySelector('input[name="data"]').value
    let time = form.querySelector('input[name="time"]').value
    let series = form.querySelector('input[name="series"]').value
    let number = form.querySelector('input[name="number"]').value
    let dateIssue = form.querySelector('input[name="dateIssue"]').value
    let model = form.querySelector('input[name="model"]').value
    let brand = form.querySelector('input[name="brand"]').value
    let payment = form.querySelector('input[name="payment"]').value

    if (
      !address ||
      !tel ||
      !data ||
      !time ||
      !series ||
      !number ||
      !dateIssue ||
      !model ||
      !brand ||
      !payment
    ) {
      message.textContent = "Все поля обязательны для заполнения"
      return
    }

    let orderData = {
      address,
      tel,
      data,
      time,
      series,
      number,
      dateIssue,
      model,
      brand,
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
        message.textContent = ""
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
