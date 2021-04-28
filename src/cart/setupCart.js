// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  // is it in the cart?
  let item = cart.find((cartItem) => cartItem.id === id);
  // if not:
  if (!item) {
    let product = findProduct(id);
    // add product to the cart array
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add product to the DOM
    addToCartDOM(product);
  } else {
    // update values
  }
  // more stuff...
  openCart();
};

const init = () => {
  console.log(cart);
};
init();
