import AdsList from './adsList';

export default class AppState {

    public adsLists: AdsList[];

    constructor() {
        this.adsLists = [
            new AdsList(1, 'default - ads list'),
        ];
    }
}
