import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Added import
import App from './App';
import './input.css'; // Make sure to adjust the path if it's incorrect
import { ProductContextProvider } from './context/productContext';
import RatingContextProvider from './context/ratingContext'; // Adjusted import
import store from './Redux/store'; // Assuming you have configured your Redux store


ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>
    <Provider store={store}>
      <ProductContextProvider>
        <RatingContextProvider>
          <App />
        </RatingContextProvider>
      </ProductContextProvider>
    </Provider>
  </React.StrictMode>,
);
