import {push as rlrPush, replace as rlrReplace} from "redux-little-router"

export const ActionTypes = {
    PUSH: "@@browser-navigation-helper/PUSH",
    REPLACE: "@@browser-navigation-helper/REPLACE",
    BACK: "@@browser-navigation-helper/BACK",
    FORWARD: "@@browser-navigation-helper/FORWARD"
}

export const push = (hash) => ({type: ActionTypes.PUSH, hash})

export const replace = (hash) => ({type: ActionTypes.REPLACE, hash})

export const createBrowserNavigationHelper = (options = {}) => {

    var onBack = options.onBack || (() => {})
    var onForward = options.onForward || (() => {})
    var initialHashs = options.initialHashs

    const isMyAction = (() => {
        var listActionTypes = [];
        for (var key in ActionTypes) {
            listActionTypes.push(ActionTypes[key])
        }
        return function(type) {
            return listActionTypes.indexOf(type) >= 0;
        }
    })()

    return store => {
        // init this middleware here

        var _history = [];
        var currentHash = store.getState().router.hash;
        var waitingHash = undefined;

        if (initialHashs && initialHashs.indexOf(currentHash) < 0) {
            // change hash back to initialHashs
            setTimeout(() => {
                console.log("replace hash to initial hash: " + initialHashs[0]);
                waitingHash = initialHashs[0]
                store.dispatch(rlrReplace(waitingHash))
            }, 1);
        }

        return next => action => {
            var fwdAction = action;

            if (isMyAction(action.type)) {
                switch (action.type) {
                    case ActionTypes.PUSH:
                        waitingHash = action.hash
                        fwdAction = rlrPush(action.hash);
                        break
                    case ActionTypes.REPLACE:
                        waitingHash = action.hash
                        fwdAction = rlrRepace(action.hash);
                        break
                }
            } else if (action.type === "ROUTER_POP") {
                console.log("Router pop", action.payload);
            } else if (action.type === "ROUTER_PUSH") {
                console.log("Router push", action.payload);
            } else if (action.type === "ROUTER_LOCATION_CHANGED") {
                console.log("Location changed: " + action.payload.hash);
                if (action.payload.hash === waitingHash) {
                    console.log("Location is valid, save to currentHash");
                    currentHash = waitingHash;
                    waitingHash = undefined;
                } else {
                    setTimeout(() => {
                        console.log("Location is invalid, replace back to currentHash: " + currentHash);
                        waitingHash = currentHash
                        store.dispatch(rlrReplace(waitingHash))
                    }, 1);
                }
            }

            if (fwdAction) {
                next(fwdAction)
            }
        }
    }
}
