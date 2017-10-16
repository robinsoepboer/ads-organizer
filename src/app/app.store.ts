import AdsList from './models/adsList';
import AppState from './models/appstate';
import { createStore, Store, Action } from 'redux';
import AdsService from './services/ads.service';

let store: Store<AppState>;
let adsService: AdsService = new AdsService();

//Get application state from storage, this is an async function and data will be loaded into the app later
//by firing of the 'DATA_RETRIEVED_FROM_CHROME_STORAGE' action
async function getAsyncData(): Promise<any> {
    return await adsService.get().then((appState) => {
        if(appState && !isEmptyObject(appState)){
            store.dispatch({
                type: 'DATA_RETRIEVED_FROM_CHROME_STORAGE',
                appState: appState as AppState
            });
        }
    })
}

//function to check if an object has zero properties
function isEmptyObject(object: Object): boolean {
    return (Object.keys(object).length === 0 && object.constructor === Object);
}

function adsListsReducer(state: AdsList[], action): AdsList[] {
    switch (action.type) {
        case 'ADD_LIST':
            return [...state, new AdsList(state.length, action.listTitle)];
        case 'ADD_AD':
            let newState = [...state] as AdsList[];
            newState[action.listId].ads = [...newState[action.listId].ads, action.ad]
            return newState;
        case 'UPDATE_ADD':
            let updatedState = [...state] as AdsList[];
            updatedState[action.listId].ads[action.ad.id] = action.ad;
            return updatedState;
        default:
            return state;
    }
}

function mainReducer(state: AppState, action): AppState {
    if (!state) {
        state = new AppState();
    }

    if(action.type === 'DATA_RETRIEVED_FROM_CHROME_STORAGE' && action.appState){
        state = action.appState;
    }

    return {
        adsLists: adsListsReducer(state.adsLists, action)
    }
}


getAsyncData();

store = createStore((state, action) => mainReducer(state, action));

//Save data back to storage on every change
store.subscribe(() => {
    adsService.save(store.getState());
});

export default store;