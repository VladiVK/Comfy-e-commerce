import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  if (response) {
    return response.json();
  }
  return response;

  // try {
  //   const response = await fetch(allProductsUrl);
  //   const products = await response.json();
  //   return products;
  // } catch (error) {
  //   console.log(error);
  // }
};

export default fetchProducts;
