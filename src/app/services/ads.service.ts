import Ad from '../models/ad';
import AdsList from '../models/adsList';
import AppState from '../models/appstate';
import ConfigService from '../services/config.service';

export default class AdsService {
    
    configService: ConfigService;

    constructor(){
        this.configService = new ConfigService();
    }

    get(): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {           
            //if the 'chrome' and 'chrome.storage' object are defined then the app is run as 
            //browser extension so save data in 'chrome.storage'
            if(chrome && chrome.storage){
                chrome.storage.local.get((data) => {
                    if(data)
                        resolve(data.appState);
                    else
                        resolve(data);
                });
            }
            //else fallback on localStorage
            else {
                var data = localStorage.getItem(this.configService.config.StorageKey);
                resolve(JSON.parse(data) as AppState)
            }                
        });

        return promise;
    }

    save(state: AppState): void {
        let storageKey = this.configService.config.StorageKey;

        //if the 'chrome' and 'chrome.storage' object are defined then the app is run as 
        //browser extension so save data in 'chrome.storage'
        if(chrome && chrome.storage){
            chrome.storage.local.set({storageKey: state});
        }
        //else fallback on localStorage        
        else {
            localStorage.setItem(storageKey, JSON.stringify(state));
        }
    }

    saveTestData(): void {
        let storageKey = this.configService.config.StorageKey;        
        let testData = require('../../../test-data.json');

        //if the 'chrome' and 'chrome.storage' object are defined then the app is run as 
        //browser extension so save data in 'chrome.storage'
        if(chrome && chrome.storage){
            chrome.storage.local.set({storageKey: testData});
        }
        //else fallback on localStorage        
        else {
            localStorage.setItem(storageKey, JSON.stringify(testData));
        }

        alert('Test data saved to storage, app will be reloaded.');
        location.reload();
    }
}