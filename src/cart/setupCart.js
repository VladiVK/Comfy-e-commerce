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
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((item) => item.dataset.id === id);
    newAmount.textContent = amount;
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

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });

  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });

  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target;
    // we need parent if we have an icon as a pressing area
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    // *** remove ***
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      // remove one product( <article>...</article>)
      // element.parentElement.parentElement.remove(); or ...
      parent.parentElement.remove();
    }
    // *** increase ***
    // now we have an icon as a button... so we need a parent element
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // *** decrease ***
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

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
