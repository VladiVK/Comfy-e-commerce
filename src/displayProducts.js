import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, domElement) => {
  console.log(domElement);
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
};

export default display;
//   single product
