import ActionTypes from '../actions/action-types';
import AdsList from '../models/adsList';

function adsListsReducer(state: AdsList[], action): AdsList[] {
    switch (action.type) {
        case ActionTypes.ListCreate:
            return [...state, new AdsList(state.length, action.listTitle)];
        case ActionTypes.AdCreate:
            let newState = [...state] as AdsList[];
            newState[action.listId].ads = [...newState[action.listId].ads, action.ad]
            return newState;
        case ActionTypes.AdUpdate:
            let updatedState = [...state] as AdsList[];
            updatedState[action.listId].ads[action.ad.id] = action.ad;
            return updatedState;
        default:
            return state;
    }
}

export default adsListsReducer;