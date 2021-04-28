import { getStorageItem, setStorageItem } from './utils.js';
// initial data getting: items or []
let store = getStorageItem('store');

// invoke only in index.js after fetching data
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;

    return {
      id,
      featured,
      name,
      price,
      company,
      colors,
      image,
    };
  });
  setStorageItem('store', store);
};

const findProduct = (id) => {
  // product or undefined
  return store.find((product) => product.id === id);
};
export { store, setupStore, findProduct };
