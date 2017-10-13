import AdsList from '../models/adsList';
import AppState from '../models/appstate';
import { createStore, Store, Action } from 'redux';
import AdsService from '../services/ads.service';

let adsService: AdsService = new AdsService();
let store: Store<AppState> = createStore((state, action) => mainReducer(state, action));

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
        state = adsService.get();
    }

    return {
        adsLists: adsListsReducer(state.adsLists, action)
    }
}

store.subscribe(() => {
    adsService.save(store.getState());
})

export default store;