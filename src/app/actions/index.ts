import Store from '../app.store';
import ActionTypes from './action-types';
import AppState from '../models/appState';
import Ad from '../models/ad';

/* General */

export const dataRetrievedFromStorage = (appState: AppState) => {
    Store.dispatch({
        type: ActionTypes.DataRetrievedFromStorage,
        appState,
    });
};

/* List */

export const createList = (listTitle: string) => {
    Store.dispatch({
        type: ActionTypes.ListCreate,
        listTitle,
    });
};

export const updateList = (listTitle: string, listId: number) => {
    Store.dispatch({
        type: ActionTypes.ListUpdate,
        listId,
        listTitle,
    });
};

export const deleteList = (listId: number) => {
    Store.dispatch({
        type: ActionTypes.ListDelete,
        listId,
    });
};

/* Ad */

export const createAd = (ad: Ad, listId: number) => {
    Store.dispatch({
        type: ActionTypes.AdCreate,
        ad,
        listId,
    });
};

export const updateAd = (ad: Ad, listId: number) => {
    Store.dispatch({
        type: ActionTypes.AdUpdate,
        ad,
        listId,
    });
};

export const deleteAd = (adId: number, listId: number) => {
    Store.dispatch({
        type: ActionTypes.AdDelete,
        adId,
        listId,
    });
};

export const moveAd = (adId: number, listFromId: number, dropZoneId: number, listToId: number) => {
    Store.dispatch({
        type: ActionTypes.AdMove,
        adId,
        listFromId,
        dropZoneId,
        listToId,
    });
};
