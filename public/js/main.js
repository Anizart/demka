document.addEventListener("DOMContentLoaded", async function () {
  const wrapper = document.querySelector(".history-order__wrapper")

  const res = await fetch("/api/order/getOrder", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Ошибка загрузки заявок")
  }

  const orders = await res.json()

  // Если заказов нет:
  if (!orders || orders.length === 0) {
    wrapper.innerHTML = "<p>Заявок пока нет</p>"
    return
  }

  orders.forEach((order) => {
    const requestElement = document.createElement("div")
    requestElement.classList.add("request-card")

    requestElement.innerHTML = `
        <div class="history-order__card">
            <p class="history-order__text">Марка: ${order.brand}</p>
            <p class="history-order__text">Модель: ${order.model}</p>
            <p class="history-order__text">Дата: ${order.data}</p>
            <p class="history-order__text">Время: ${order.time}</p>
            <p class="history-order__text">Адрес: ${order.address}</p>
            <p class="history-order__text">Статус: ${order.status}</p>
        </div>
        `

    wrapper.appendChild(requestElement)
  })
})
