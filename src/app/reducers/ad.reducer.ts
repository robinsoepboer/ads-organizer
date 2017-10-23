import ActionTypes from '../actions/action-types';
import Ad from '../models/ad';
import { getNextAdId, findIndexOfAd } from '../helpers';

function adsReducer(state: Ad[], action): Ad[] {
    switch (action.type) {
        case ActionTypes.AdCreate: {
            return [
                ...state,
                {
                    ...action.ad,
                    id: getNextAdId(),
                },
            ];
        }
        case ActionTypes.AdUpdate: {
            const index = findIndexOfAd(state, action.ad.id);
            return [
                ...state.slice(0, index),
                { ...action.ad },
                ...state.slice(index + 1),
            ];
        }
        case ActionTypes.AdDelete: {
            const index = findIndexOfAd(state, action.adId);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1),
            ];
        }
        default:
            return state;
    }
}

export default adsReducer;
