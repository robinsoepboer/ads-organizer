import ActionTypes from '../actions/action-types';
import AdsList from '../models/adsList';
import { getNextId } from '../helpers';
import adsReducer from './ad.reducer';

function adsListsReducer(state: AdsList[], action): AdsList[] {
    switch (action.type) {
        case ActionTypes.ListCreate: {
            return [
                ...state,
                new AdsList(getNextId(state), action.listTitle),
            ];
        }
        case ActionTypes.ListUpdate: {
            const index = findIndexofAdsList(state, action.listId);
            return [
                ...state.slice(0, index),
                {
                    ...state[index],
                    title: action.listTitle,
                },
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
        case ActionTypes.AdCreate:
        case ActionTypes.AdUpdate:
        case ActionTypes.AdDelete: {
            const index = findIndexofAdsList(state, action.listId);
            return [
                ...state.slice(0, index),
                {
                    ...state[index],
                    ads: adsReducer(state[index].ads, action),
                },
                ...state.slice(index + 1),
            ];
        }
        default:
            return state;
    }
}

function findIndexofAdsList(state: AdsList[], id: number): number {
    return state.indexOf(state.filter((adsList) => adsList.id === id)[0]);
}

export default adsListsReducer;
