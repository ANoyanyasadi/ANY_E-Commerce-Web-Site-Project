import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();

//! Sepete Ekleme Yapacak Fonksyon
export function addToCart(event, products) {
  //! Event Target özelliği ile dsataset'te ürün id sine eriştik. 
  const productId = parseInt(event.target.dataset.id);
  //! Dataset id, ile denk gelen/aynı başka ürün var mı ? 
  const product = products.find((product) => product.id === productId);
  //!   console.log(product);
  //! Eklenecek Veri Öncesinde Sepette varsa  bunu yeni bir Eleman olarak Ekleme.
  if (product) {
    //! Eğer ürün varsa ürünü bul
    const exitingItem = cart.find((item) => item.id === productId);
    //! Ürün sepette varsa ürünü ekleme
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      //! Eklenecek veriyi objeye çevir
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      cart.push(cartItem);
      //! Ekleme yapılan cartın içeriğini güncelle
      event.target.textContent = "Added";
      //! Sepet Iconunu Güncelleyen Fonksyon
      updateCartIcon(cart);
      //! Localstorage a kayıt yapan Fonksyon
      saveToLocalStorage(cart);
      //! Toplam Miktarı Hesapla
      displayCartTotal;
      //! Sepet İconunu Güncelle
      updateCartIcon(cart);
    }
  }
}

//! Sepetten Ürünleri Silecek Fonksyon
const removeFromCart = (event) => {
  //! Silinecek elemanın ID sine eriştik
  const productID = parseInt(event.target.dataset.id);
  //! Tıklanılan elemanı sepetten kaldır
  cart = cart.filter((item) => item.id !== productID);
  //! Localestorage'ı güncelle
  saveToLocalStorage(cart);
  //! Sayfayı güncelle
  renderCartItems();
  //! Toplam Miktarı Hesapla
  displayCartTotal();
  //! Sepet İconunu Güncelle
  updateCartIcon(cart);
};

//! Sepetteki elemanları render edecek Fonksyon
export const renderCartItems = () => {
  //! Html de elemanların render edileceği kapsayıcıya eriş
  const cartItemsElement = document.querySelector("#cartItems");

  //! Sepetteki her bir eleman için Cart Item render et
  cartItemsElement.innerHTML = cart
    .map( //! MAP i html den aldığımız elemanları değiştirmek, revize etmek için kullandık */
      (item) =>
        `
        <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />
              <!-- * Info Kısımı -->
              <div class="cart-item-info">
                <h2>${item.title} </h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id='${item.id}'
                />
              </div>
              <h2 class="cart-item-price">$${item.price} </h2>
              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>
  `
    )
    .join("");  //! Elemanları birbirine bağladık */

  //! Remove butonlarına eriş
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  //! Quantity Inputlarına eriş
  const quantityInputs = document.getElementsByClassName(
    "cart-item-quantity"
  );

  //! Her bir inputun değişme olayını izle
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

//! Inputlar değiştiğinde çalışıcak olan Fonksyon
const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productId = +event.target.dataset.id;

  //! Yeni miktar 0'dan büyükse:
  if (newQuantity > 0) {
    //! ID'si bilinen elemanın bilgilerini bul
    const cartItem = cart.find((item) => item.id === productId);

    //! Eğer ki eleman sepette bulunamadıysa fonksyonu durdur
    if (!cartItem) return;

    //! Ürünün miktarını güncelle
    cartItem.quantity = newQuantity;

    //! Localstorage'ı güncelle
    saveToLocalStorage(cart);

    //! Sepet ikonundaki değeri güncelle
    updateCartIcon(cart);

    //! Toplam fiyatı güncelle
    displayCartTotal();
  }
};

//! Toplam miktarı ekrana basmak için 
export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)} `;
};
