import Store from '../app.store';
import AppState from '../models/appState';

export enum ActionType {
    DataRetrievedFromStorage = 'DATA_RETRIEVED_FROM_CHROME_STORAGE'
}

export const dataRetrievedFromStorage = (appState) => {
    Store.dispatch({
        type: ActionType.DataRetrievedFromStorage,
        appState: appState as AppState
    });
}