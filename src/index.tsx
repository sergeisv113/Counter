import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './counterSimpl/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./counterRedux/store/store";
import {AppRedux} from "./counterRedux/AppRedux";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <App/>
        <Provider store={store}>
            <AppRedux/>
        </Provider>
    </>
);

reportWebVitals();
