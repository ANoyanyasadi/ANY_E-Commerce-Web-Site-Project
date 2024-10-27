// ! Bağlantıyı kontrol ettik. 
// console.log(`Selam js`);

import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

// ! HTML 'den Elemanları Çekme
const menuIcon = document.querySelector("#menu-icon");
//!console.log(menuIcon);
const menu = document.querySelector(".navbar");
//! console.log(menu);

//! MENU ICONUNA TIKLAYINCA MENU KISMINA CLASS EKLE VE ÇIKAR
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

//! SAYFA YÜKLENİLDİĞİNDE ÇALIŞACAK FONKSYON
document.addEventListener("DOMContentLoaded", async () => {
  const cart = getFromLocalStorage();
 //! console.log(window);

  //! Tarayıcıda Ana Sayfada mıyız Cart Sayfasında mı
  
  //! cart.html
  if (window.location.pathname.includes("cart.html")) {
    // console.log(`Cart Sayfası`);
    renderCartItems();
    displayCartTotal();
  }
  //! index.html
  else {
    //! console.log(`Ana Sayfa`);
    const product = await fetchProducts();
    //! console.log(product);
    //! Buradaki arrow function addToCartCallBack fonksiyonu olarak çalışıyor.
    renderProducts(product, (event) => addToCart(event, product));
  }
  //! Sepet İconunu Güncellemek için 
  updateCartIcon(cart);
});