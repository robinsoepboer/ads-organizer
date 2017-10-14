import AdsList from '../models/adsList';
import AppState from '../models/appstate';
import { createStore, Store, Action } from 'redux';
import AdsService from '../services/ads.service';

let store: Store<AppState>;
let adsService: AdsService = new AdsService();

async function getAsyncData(): Promise<any> {
    return await adsService.get().then((data) => {
        if(data.appState && !(Object.keys(data.appState).length === 0 && data.appState.constructor === Object)){
            store.dispatch({
                type: 'DATA_RETRIEVED_FROM_CHROME_STORAGE',
                appState: data.appState as AppState
            });
        }
    })
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

store.subscribe(() => {
    adsService.save(store.getState());
});

export default store;