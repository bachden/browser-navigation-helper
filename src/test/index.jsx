import 'react-hot-loader/patch';

import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"

import Application from "./components/app"
import store from "./store"

import {AppContainer} from 'react-hot-loader'

function render(Application) {
    ReactDOM.render((<Provider store={store}>
        <AppContainer>
            <Application/>
        </AppContainer>
    </Provider>), document.getElementById("application-root"));
}

render(Application)

if (module.hot) {
    module.hot.accept('./components/app.jsx', () => {
        var app = require('./components/app.jsx').default;
        render(app);
    })
}
