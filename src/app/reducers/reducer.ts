import AdsList from '../models/adsList';
import AppState from '../models/appstate';

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

export default mainReducer;