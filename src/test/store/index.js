import {combineReducers, createStore, compose, applyMiddleware} from "redux"

import {createBrowserNavigationHelper} from "../../main"

import {routerForBrowser} from "redux-little-router";

let RouterConfig = routerForBrowser({
    routes: {
        "/#": {
            title: "Home",
            "/game": {
                "/roma": {
                    title: "Game Roma"
                },
                '/lavar': {
                    title: "Game Lavar"
                }
            }
        }
    }
})

const reducer = combineReducers({router: RouterConfig.reducer})

let browserNavigationOptions = {
    initialHashs: [
        "#/", "#", ""
    ],
    onBack: () => {
        console.log("Back button pressed")
    },
    onForward: () => {
        console.log("Forward button pressed");
    }
}

const store = createStore(reducer, {}, compose( //
        RouterConfig.enhancer, //
        applyMiddleware(createBrowserNavigationHelper(browserNavigationOptions), RouterConfig.middleware)))

export default store
