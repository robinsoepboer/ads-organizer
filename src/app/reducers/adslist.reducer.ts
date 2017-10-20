import ActionTypes from '../actions/action-types';
import AdsList from '../models/adsList';

function adsListsReducer(state: AdsList[], action): AdsList[] {
    switch (action.type) {
        case ActionTypes.ListCreate: {
            return [
                ...state,
                new AdsList(state.length, action.listTitle),
            ];
        }
        case ActionTypes.ListUpdate: {
            const index = findIndexofAdsList(state, action.listId);
            return [
                ...state.slice(0, index),
                state[index].title = action.listTitle,
                ...state.slice(index + 1),
            ];
        }
        case ActionTypes.ListDelete: {
            const index = findIndexofAdsList(state, action.listId);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1),
            ];
        }
        case ActionTypes.AdCreate: {
            const newState = [...state];
            newState[action.listId].ads = [...newState[action.listId].ads, action.ad]
            return newState;
        }
        case ActionTypes.AdUpdate: {
            const updateState = [...state] as AdsList[];
            updateState[action.listId].ads[action.ad.id] = action.ad;
            return updateState;
        }
        default:
            return state;
    }
}

function findIndexofAdsList(state: AdsList[], id: number): number {
    return state.indexOf(state.filter((adsList) => adsList.id === id)[0]);
}

export default adsListsReducer;
