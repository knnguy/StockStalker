/*
 * action types
 */

export const ADD_PRODUCTS = "ADD_PRODUCTS"


/*
 * action creators
 */

export const addProducts = list_of_products => ({
    type: ADD_PRODUCTS,
    products: list_of_products,
})

