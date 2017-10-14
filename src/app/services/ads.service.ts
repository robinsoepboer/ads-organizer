import Ad from '../models/ad';
import AdsList from '../models/adsList';
import AppState from '../models/appstate';

export default class AdsService {
    get(): Promise<any> {

        const promise = new Promise<any>((resolve, reject) => {           
            if(chrome && chrome.storage){
                chrome.storage.local.get((data) => {
                    resolve(data);
                });
            }
            else {
                var data = localStorage.getItem('appState');
                resolve(JSON.parse(data) as AppState)
            }                
        });

        return promise;
    }

    save(state: AppState): void {
        if(chrome && chrome.storage){
            chrome.storage.local.set({'appState': state});
        }
        else {
            localStorage.setItem('appState', JSON.stringify(state));
        }
    }
}