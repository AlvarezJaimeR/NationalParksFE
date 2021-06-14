import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

//initial app state
const initialState = {};

//middleware
const middleware = [thunk];

//...middleware (spread operator) because we want it to be added on to the middleware array
const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;