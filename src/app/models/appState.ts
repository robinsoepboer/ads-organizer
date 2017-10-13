import AdsList from './adsList';

export default class AppState {
    constructor(){
        this.adsLists = [];
    }

    adsLists: AdsList[];
}