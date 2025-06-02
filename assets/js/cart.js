// --- cart.html 中使用的購物車渲染邏輯（讀取並渲染 localStorage 資料） ---

document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.querySelector('.cart-table tbody');
  const totalSection = document.querySelector('.total-table');
  const checkoutLink = document.querySelector('a[href="checkout.html"]');

  let cart = JSON.parse(localStorage.getItem('cart_items')) || [];

  if (cartTableBody && cart.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="6" class="text-center">目前購物車是空的</td></tr>';
    if (totalSection) {
      totalSection.innerHTML = `
        <thead class="total-table-head">
          <tr class="table-total-row">
            <th>全部</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          <tr class="total-data">
            <td><strong>商品金額</strong></td>
            <td>0元</td>
          </tr>
          <tr class="total-data">
            <td><strong>運費</strong></td>
            <td>0元</td>
          </tr>
          <tr class="total-data">
            <td><strong>總金額</strong></td>
            <td>0元</td>
          </tr>
        </tbody>
      `;
    }
    if (checkoutLink) {
      checkoutLink.classList.add('disabled');
      checkoutLink.style.pointerEvents = 'none';
      checkoutLink.style.opacity = '0.5';
    }
    return;
  }

  if (cartTableBody) {
    cartTableBody.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
      const row = document.createElement('tr');
      row.classList.add('table-body-row');

      const total = item.price * item.quantity;
      subtotal += total;

      row.innerHTML = `
        <td class="product-remove"><a href="#" data-index="${index}"><i class="far fa-window-close"></i></a></td>
        <td class="product-image"><img src="${item.image}" alt=""></td>
        <td class="product-name">${item.name}</td>
        <td class="product-price">${item.price}元</td>
        <td class="product-quantity"><input type="number" min="1" value="${item.quantity}" data-index="${index}"></td>
        <td class="product-total">${total}元</td>
      `;

      cartTableBody.appendChild(row);
    });

    const shipping = 60;
    const total = subtotal + shipping;

    totalSection.innerHTML = `
      <thead class="total-table-head">
        <tr class="table-total-row">
          <th>全部</th>
          <th>金額</th>
        </tr>
      </thead>
      <tbody>
        <tr class="total-data">
          <td><strong>商品金額</strong></td>
          <td>${subtotal}元</td>
        </tr>
        <tr class="total-data">
          <td><strong>運費</strong></td>
          <td>${shipping}元</td>
        </tr>
        <tr class="total-data">
          <td><strong>總金額</strong></td>
          <td>${total}元</td>
        </tr>
      </tbody>
    `;

    // 監聽數量變更事件
    document.querySelectorAll('.product-quantity input').forEach(input => {
      input.addEventListener('input', () => {
        const index = parseInt(input.getAttribute('data-index'));
        const newQty = parseInt(input.value);

        if (newQty > 0) {
          cart[index].quantity = newQty;
          localStorage.setItem('cart_items', JSON.stringify(cart));
          location.reload();
        }
      });
    });

    // ➤ 恢復刪除功能
    cartTableBody.querySelectorAll('.product-remove a').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = e.currentTarget.dataset.index;
        cart.splice(idx, 1);
        localStorage.setItem('cart_items', JSON.stringify(cart));
        location.reload();
      });
    });
  }
});

