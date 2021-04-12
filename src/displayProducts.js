import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
import { openCart } from './cart/toggleCart.js';
const display = (products, domElement) => {
  domElement.innerHTML = products
    .map(({ id, name, price, image }) => {
      return `
    <article class="product">
        <div class="product-container">
          <img class="product-img img" src="${image}" alt="${name}">
          <div class="product-icons">
            <a href="./product.html?id=${id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <footer>
          <p class="product-name">${name}</p>
          <h4 class="product-price">${formatPrice(price)}</h4>
        </footer>
   </article>  
        `;
    })
    .join('');

  domElement.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    if (parent.classList.contains('product-cart-btn')) {
      addToCart(parent.dataset.id);
      //   open cart on page (optional)
      openCart();
    }
  });
};

export default display;
//   single product
