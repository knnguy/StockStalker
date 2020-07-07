// import { configureStore } from '@reduxjs/toolkit';

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

import { createStore } from 'redux'
import app from './reducers'

const store = createStore(app)
export default store