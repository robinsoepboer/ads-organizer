import ActionTypes from '../actions/action-types';
import AdsList from '../models/adsList';

function adsListsReducer(state: AdsList[], action): AdsList[] {
    switch (action.type) {
        case ActionTypes.ListCreate:
            return [...state, new AdsList(state.length, action.listTitle)];
        case ActionTypes.ListUpdate:
            let updatedListUpdateState = [...state] as AdsList[];
            updatedListUpdateState[action.listId].title = action.listTitle;
            return updatedListUpdateState;
        case ActionTypes.AdCreate:
            let newState = [...state] as AdsList[];
            newState[action.listId].ads = [...newState[action.listId].ads, action.ad]
            return newState;
        case ActionTypes.AdUpdate:
            let updatedAddUpdateState = [...state] as AdsList[];
            updatedAddUpdateState[action.listId].ads[action.ad.id] = action.ad;
            return updatedAddUpdateState;
        default:
            return state;
    }
}

export default adsListsReducer;