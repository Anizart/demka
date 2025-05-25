document.addEventListener("DOMContentLoaded", async function () {
  const wrapper = document.querySelector(".wrapper-cards")

  try {
    const res = await fetch("/api/admin/getAllOrders", {
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

    if (!orders.length) {
      wrapper.innerHTML = "<p>Заявок пока нет</p>"
      return
    }

    orders.forEach((request) => {
      const requestElement = document.createElement("div")
      requestElement.classList.add("request-card")

      const reasonInputStyle = request.status === "cancelled" ? "block" : "none"

      requestElement.innerHTML = `
          <p><strong>Адрес:</strong> ${request.address}</p>
          <p><strong>Телефон:</strong> ${request.tel}</p>
          <p><strong>Дата:</strong> ${request.data}</p>
          <p><strong>Время:</strong> ${request.time}</p>
          <p><strong>Марка:</strong> ${request.brand}</p>
          <p><strong>Модель:</strong> ${request.model}</p>
          <p><strong>Способ оплаты:</strong> ${request.payment}</p>
          <p><strong>Статус:</strong> ${request.status}</p>
          ${
            request.reason
              ? `<p><strong>Причина отмены:</strong> ${request.reason}</p>`
              : ""
          }
  
          <div class="request-actions">
            <select id="status-${request.id}" class="request-select">
              <option value="новая заявка" ${
                request.status === "новая заявка" ? "selected" : ""
              }>Новая заявка</option>
              <option value="одобрено" ${
                request.status === "одобрено" ? "selected" : ""
              }>Одобрено</option>
              <option value="выполнено" ${
                request.status === "выполнено" ? "selected" : ""
              }>Выполнено</option>
              <option value="отклонено" ${
                request.status === "отклонено" ? "selected" : ""
              }>Отклонено</option>
            </select>
  
            <input type="text" id="reason-${
              request.id
            }" placeholder="Укажите причину отклонения" style="display: ${reasonInputStyle}; margin-top: 5px;">
  
            <button onclick="updateRequestStatus(${
              request.id
            })" class="request-btn">Обновить статус</button>
          </div>
        `

      wrapper.appendChild(requestElement)

      // Показываем поле причины при выборе "отклонено"
      const statusSelect = document.getElementById(`status-${request.id}`)
      const reasonInput = document.getElementById(`reason-${request.id}`)

      statusSelect.addEventListener("change", () => {
        reasonInput.style.display =
          statusSelect.value === "отклонено" ? "block" : "none"
      })
    })
  } catch (error) {
    console.error("Ошибка:", error)
    requestsList.innerHTML = `<p class="error">Ошибка загрузки заявок: ${error.message}</p>`
  }
})
