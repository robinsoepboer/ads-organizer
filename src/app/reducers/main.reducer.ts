import AppState from '../models/appstate';
import adsListsReducer from './adslist.reducer';

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