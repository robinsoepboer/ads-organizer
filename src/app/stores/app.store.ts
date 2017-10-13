import AdsList from '../models/adsList';
import { createStore, Store, Action } from 'redux';
import AdsService from '../services/ads.service';

let adsService: AdsService = new AdsService();    
let store: Store<AdsList[]> = createStore((state, action) => reducer(state, action));

function reducer(state: AdsList[], action): AdsList[]{
    if(!state){
        state = adsService.get();
    }

    switch(action.type){
        case 'ADD_LIST':
            return [...state, new AdsList(0, action.listTitle)];
        case 'ADD_AD':
            let newState = [...state] as AdsList[];
            newState[action.listId].ads = [...newState[action.listId].ads, action.ad]  
            return newState;
        default: 
            return state; 
    }
}
 
export default store;