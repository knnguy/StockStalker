import { combineReducers } from 'redux'
import { ADD_PRODUCTS } from './actions'


const products = (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return [...action.products]
        default:
            return state
    }
}

const app = combineReducers({
    products,
})

export default app