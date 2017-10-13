import AdsList from '../models/adsList';
import { createStore, Store, Action } from 'redux';
import AdsService from '../services/ads.service';

let adsService: AdsService = new AdsService();    
let store: Store<AdsList[]> = createStore((state, action) => reducer(state, action));

function reducer(state: AdsList[], action){
    if(!state){
        state = adsService.get();
    }

    switch(action.type){
        case 'ADD_LIST':
            return [...state, new AdsList(0, action.listTitle)] 
        default: 
            return state; 
    }
}
 
export default store;