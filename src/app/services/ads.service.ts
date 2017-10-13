import Ad from '../models/ad';
import AdsList from '../models/adsList';
import AppState from '../models/appstate';

export default class AdsService {
    get(): AppState {
        let stateString: string = localStorage.getItem('Two.AppState');
        let state = (stateString) ? JSON.parse(stateString) as AppState : new AppState();
        return state;
    }

    save(state: AppState): void {
        localStorage.setItem('Two.AppState', JSON.stringify(state));        
    }
}