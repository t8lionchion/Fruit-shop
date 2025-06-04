// --- home.html 中使用的購物車邏輯（加入商品至 localStorage） ---

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// 每次載入頁面先檢查是否已有訪客 ID
if (!localStorage.getItem('guest_id')) {
  const uuid = generateUUID();
  localStorage.setItem('guest_id', uuid);
  localStorage.setItem('cart_items', JSON.stringify([]));
}

// 點擊加入購物車按鈕事件綁定
const cartButtons = document.querySelectorAll('.cart-btn');
cartButtons.forEach((btn, index) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const productCard = btn.closest('.single-product-item') ||
      btn.closest('.content-column') ||
      btn.closest('.shop-banner') ||
      btn.closest('.single-product-content');
    const name = productCard.querySelector('h3').textContent.trim();
    const priceText =
      productCard.querySelector('.product-price')?.textContent ||
      productCard.querySelector('.single-product-pricing')?.textContent ||
      '220元';


    // 修正價格提取：取得最後出現的數字（確保不是例如「1顆 20元」被誤解析成 120）
    const priceMatches = priceText.match(/\d+/g);
    const price = priceMatches ? parseInt(priceMatches[priceMatches.length - 1]) : 220;

    const image = productCard.querySelector('img')?.getAttribute('src') || 
    'assets/img/products/product-img-1.jpg' ;

    // 讀取現有購物車內容
    let cart = JSON.parse(localStorage.getItem('cart_items')) || [];

    // 檢查是否已存在該商品，若是則數量 +1
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart_items', JSON.stringify(cart));
    alert(`${name} 已加入購物車！`);
  });
});
