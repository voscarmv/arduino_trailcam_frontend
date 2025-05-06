// import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configStore(initialState){
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: {
          counter: rootReducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
      });
      sagaMiddleware.run(rootSaga);
    return store;
}


// export default function configureStore(initialState) {
//   const sagaMiddleware = createSagaMiddleware();
//   const middlewares = [sagaMiddleware];
//   const middlewareEnhancer = applyMiddleware(...middlewares);

//   const enhancers = [middlewareEnhancer];
//   const composedEnhancers = composeWithDevTools(...enhancers);

//   const store = createStore(rootReducer, initialState, composedEnhancers);

//   sagaMiddleware.run(rootSaga);
//   return store;
// }