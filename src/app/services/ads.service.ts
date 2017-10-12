import Ad from '../models/ad';
import AdsList from '../models/adsList';

export default class AdsService {
    get(): AdsList[] {
        let adsString: string = localStorage.getItem('Two.AdsLists');
        let ads = (adsString) ? JSON.parse(adsString) as AdsList[] : new Array<AdsList>();
        return ads;
    }

    save(adsLists: AdsList[]){
        localStorage.setItem('Two.AdsLists', JSON.stringify(adsLists));        
    }
}