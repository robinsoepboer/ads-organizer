import Store from '../app.store';
import AdsList from '../models/adsList';
import Ad from '../models/ad';

export function getNextId(array: any[]): number {
    let nextId = 0;
    array.forEach((item) => {
        if (!item.id)
            throw new Error('getNextId Helper: Objects in array doesn\'t have \'id\' property!');

        if (item.id > nextId)
            nextId = item.id;
    });

    return nextId + 1;
}

export function getNextAdId(): number {
    const state = Store.getState();

    let lastId = 0;
    state.adsLists.forEach((item) => {
        item.ads.forEach((ad) => {
            if (!ad.id)
                throw new Error('getNextId Helper: Objects in array doesn\'t have \'id\' property!');

            if (ad.id > lastId)
                lastId = ad.id;
        });
    });

    return lastId + 1;
}

export function findIndexofAdsList(state: AdsList[], id: number): number {
    return state.indexOf(state.filter((adsList) => adsList.id === id)[0]);
}

export function findIndexOfAd(state: Ad[], id: number): number {
    return state.indexOf(state.filter((ad) => ad.id === id)[0]);
}
