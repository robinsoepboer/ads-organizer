import AdsList from './models/adsList';
import AppState from './models/appstate';
import { createStore, Store, Action } from 'redux';
import AdsService from './services/ads.service';
import mainReducer from './reducers/main.reducer';
import { dataRetrievedFromStorage } from './actions';

let store: Store<AppState>;
const adsService: AdsService = new AdsService();

// Get application state from storage, this is an async function and data will be loaded into the app later
// by firing of the 'DATA_RETRIEVED_FROM_CHROME_STORAGE' action
async function getAsyncData(): Promise<any> {
    return await adsService.get().then((appState) => {
        if (appState && !isEmptyObject(appState)) {
            dataRetrievedFromStorage(appState as AppState);
        } else {
            dataRetrievedFromStorage(new AppState());
        }
    });
}

// function to check if an object has zero properties
function isEmptyObject(object: object): boolean {
    return (Object.keys(object).length === 0 && object.constructor === Object);
}

getAsyncData();

store = createStore(mainReducer);

// Save data back to storage on every change
store.subscribe(() => {
    adsService.save(store.getState());
});

export default store;
