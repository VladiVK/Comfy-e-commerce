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
  // add one to the item count
  displayCartItemCount();

  // display cart totals
  displayCartTotal();

  // set cart in local storage
  setStorageItem('cart', cart);

  // more stuff...
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);

  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  const totalPrice = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);

  cartTotalDOM.textContent = `Total : ${formatPrice(totalPrice)}`;
}
function setupCartFunctionality() {}
function displayCartItemsDOM() {
  cart.forEach((cartItem) => addToCartDOM(cartItem));
}

const init = () => {
  // display amount of items in the cart
  displayCartItemCount();
  // display cart total price
  displayCartTotal();
  // add all items to the DOM
  displayCartItemsDOM();
  // setup cart functionality(add, remove ...)
  setupCartFunctionality();
};
init();
