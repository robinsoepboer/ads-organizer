import AppState from '../models/appstate';
import adsListReducer from './adslist.reducer';
import ActionTypes from '../actions/action-types';

function mainReducer(state: AppState, action): AppState {
    if (!state) {
        state = new AppState();
    }

    if (action.type === ActionTypes.DataRetrievedFromStorage && action.appState) {
        state = action.appState;
    }

    return {
        adsLists: adsListReducer(state.adsLists, action),
    };
}

export default mainReducer;
