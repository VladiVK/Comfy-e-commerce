// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

const loading = getElement('.page-loading');
// **** we do not need wait for content loading!!! in this file!!!
// we use already downloaded store !!!

display(store, getElement('.products-container'));
// search by broduct name
setupSearch(store);
setupCompanies(store);
setupPrice(store);
loading.style.display = 'none';
