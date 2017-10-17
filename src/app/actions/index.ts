import Store from '../app.store';
import ActionTypes from './action-types';
import AppState from '../models/appState';
import Ad from '../models/ad';

/* General */

export const dataRetrievedFromStorage = (appState: AppState) => {
    Store.dispatch({
        type: ActionTypes.DataRetrievedFromStorage,
        appState: appState
    });
}

/* List */

export const createList = (title: string) => {
    Store.dispatch({
        type: ActionTypes.ListCreate,
        listTitle: title
    });
}

/* Ad */

export const createAd = (ad: Ad, listId: number) => {
    Store.dispatch({
        type: ActionTypes.AdCreate,
        ad: ad,
        listId: listId
    })
}

export const updateAd = (ad: Ad) => {
    Store.dispatch({
        type: ActionTypes.AdUpdate,
        ad: ad,
        listId: this.props.listId
    })
}