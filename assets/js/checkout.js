// --- checkout.html 中送出訂單邏輯 ---

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitOrderBtn');

  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const guest_id = localStorage.getItem('guest_id');
      const cart = JSON.parse(localStorage.getItem('cart_items')) || [];

      if (cart.length === 0) {
        alert('購物車是空的，無法送出訂單');
        return;
      }

      const buyerName = document.querySelector('input[placeholder="名字"]').value;
      const email = document.querySelector('input[type="email"]').value;
      const address = document.querySelector('input[placeholder="地址"]').value;
      const phone = document.querySelector('input[type="tel"]').value;
      const note = document.querySelector('textarea[name="bill"]').value;

      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
      if(!email ||!address ||!buyerName ||!phone){
        alert("請填完整資訊");
        return;
      }
      const order = {
        guest_id,
        buyerName,
        email,
        address,
        phone,
        note,
        paymentMethod,
        cart_items: cart
      };

      // 模擬發送 API
      console.log('付款方式:', order.paymentMethod);
      console.log('購物車內容（表格顯示）:');
      console.table(order.cart_items);
      console.log('訂單資料:', order);
      alert('訂單已送出！');
      

      // 清除購物車與暫存資料
      localStorage.removeItem('cart_items');
      window.location.href = 'home.html';
    });
  }
});
