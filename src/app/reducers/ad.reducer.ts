import ActionTypes from '../actions/action-types';
import Ad from '../models/ad';
import { getNextId } from '../helpers';

function adsReducer(state: Ad[], action): Ad[] {
    switch (action.type) {
        case ActionTypes.AdCreate: {
            return [
                ...state,
                {
                    ...action.ad,
                    id: getNextId(state),
                },
            ];
        }
        case ActionTypes.AdUpdate: {
            const index = findIndexofAd(state, action.ad.id);
            return [
                ...state.slice(0, index),
                { ...action.ad },
                ...state.slice(index + 1),
            ];
        }
        case ActionTypes.AdDelete: {
            const index = findIndexofAd(state, action.adId);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1),
            ];
        }
        default:
            return state;
    }
}

function findIndexofAd(state: Ad[], id: number): number {
    return state.indexOf(state.filter((ad) => ad.id === id)[0]);
}

export default adsReducer;
