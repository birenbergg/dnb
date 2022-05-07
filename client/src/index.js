import React from 'react'
import ReactDOM from 'react-dom/client'

import { store } from './store/store'
import { Provider } from 'react-redux'

import App from './App'

import './css/index.css'
import './css/searchBar.css'
import './css/results.css'
import './css/pagination.css'
import './css/sideBar.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
