/* eslint-disable no-lone-blocks */
import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from './types';

export const fetchProducts = () => (dispatch) => {
  fetch('http://localhost:3012/products').then((res) => res.json())
    .then((data) => dispatch({ type: FETCH_PRODUCTS, payload: data }));
};

export const filterProducts = (products, size) => (dispatch) => {
  return dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size,
      items: size === '' ? products : products.filter((a) => a.availableSizes.indexOf(size.toUpperCase()) >= 0),
    },
  });
};

export const sortProducts = (items, sort) => (dispatch) => {
  {
    const products = items.slice();
    if (sort !== '') {
      // eslint-disable-next-line no-nested-ternary
      products.sort((a, b) => (sort === 'lowest')
        ? (a.price > b.price ? 1 : -1)
        : (a.price < b.price ? 1 : -1));
    } else {
      products.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }
    return dispatch({
      type: ORDER_PRODUCTS_BY_PRICE,
      payload: {
        order: sort,
        items: products,
      },
    });
  }
};
