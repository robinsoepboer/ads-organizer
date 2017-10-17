import AdsList from './models/adsList';
import AppState from './models/appstate';
import { createStore, Store, Action } from 'redux';
import AdsService from './services/ads.service';
import mainReducer from './reducers/reducer';

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

getAsyncData();

store = createStore(mainReducer);

//Save data back to storage on every change
store.subscribe(() => {
    adsService.save(store.getState());
});

export default store;