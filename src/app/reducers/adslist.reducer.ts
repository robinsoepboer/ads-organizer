import ActionTypes from '../actions/action-types';
import AdsList from '../models/adsList';
import Ad from '../models/ad';
import { getNextId, findIndexofAdsList, findIndexOfAd } from '../helpers';
import adsReducer from './ad.reducer';

function adsListReducer(state: AdsList[], action): AdsList[] {
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
        case ActionTypes.ListMove: {
            const indexFrom = findIndexofAdsList(state, action.listId);
            const indexTo = findIndexofAdsList(state, action.dropZoneId) + 1;
            const movingList = { ...state[indexFrom] };

            // remove moving adslist
            const newState = [
                ...state.slice(0, indexFrom),
                ...state.slice(indexFrom + 1),
            ];

            return [
                ...newState.slice(0, indexTo),
                movingList,
                ...newState.slice(indexTo),
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
        case ActionTypes.AdMove: {
            const indexFrom = findIndexofAdsList(state, action.listFromId);
            const indexTo = findIndexofAdsList(state, action.listToId);
            const adIndex = findIndexOfAd(state[indexFrom].ads, action.adId);
            const movingAd = { ...state[indexFrom].ads[adIndex] };
            const dropzoneIndex = findIndexOfAd(state[indexTo].ads, action.dropZoneId) + 1;

            // remove moving ad
            const newState = [
                ...state.slice(0, indexFrom),
                {
                    ...state[indexFrom],
                    ads: [
                        ...state[indexFrom].ads.slice(0, adIndex),
                        ...state[indexFrom].ads.slice(adIndex + 1),
                    ],
                },
                ...state.slice(indexFrom + 1),
            ];

            // Add moving ad on new location
            return [
                ...newState.slice(0, indexTo),
                {
                    ...newState[indexTo],
                    ads: [
                        ...newState[indexTo].ads.slice(0, dropzoneIndex),
                        movingAd,
                        ...newState[indexTo].ads.slice(dropzoneIndex),
                    ],
                },
                ...newState.slice(indexTo + 1),
            ];
        }
        default:
            return state;
    }
}

export default adsListReducer;
