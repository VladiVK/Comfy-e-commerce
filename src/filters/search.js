import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// search by broduct name
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  form.addEventListener('keyup', () => {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        return product.name.toLowerCase().startsWith(value);
      });
      display(newStore, getElement('.products-container'));
      if (newStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">sorry, no products match your search</h3>
          `;
      }
    } else {
      // if empty input: show all products
      display(store, getElement('.products-container'));
    }
  });
};

export default setupSearch;
