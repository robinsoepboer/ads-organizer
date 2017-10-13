import * as React from "react";

import { AdsComponent } from "./ads.component";
import { AddAdComponent } from "./add-ad.component";
import { AddListComponent } from "./add-list.component";

import AdsList from '../models/adsList';
import Ad from '../models/ad';
import AdsService from '../services/ads.service';
import Store from '../stores/app.store';

interface IState {
    adsLists: AdsList[];
}

export class TwoComponent extends React.Component<{}, IState> {

    unsubscribe;

    constructor(props: {}, context: any) {
        super();

        this.state = {
            adsLists: []
        }
    }

    componentDidMount() {
        let adsLists = Store.getState();

        // if (adsLists.length === 0) {
        //     adsLists.push(new AdsList(0, 'Default - Ads'));
        // }

        if (this.state.adsLists)
            this.setState({ adsLists: adsLists });

        this.unsubscribe = Store.subscribe(this.handleChange.bind(this))
    }

    componentWillUnmount() {
        // and unsubscribe later
        this.unsubscribe()
    }

    handleChange() {
        this.setState({
            adsLists: Store.getState()
        });
    }

    render(): JSX.Element {

        var listItems = this.state.adsLists.map((item) => {
            return (
                <AdsComponent key={item.id} adsList={item} handleChanges={(listId, ad) => this.handleAdChanges(listId, ad)} />
            );
        });

        return (
            <div>
                <div id="add-forms">
                    <AddAdComponent handleClick={(ad) => this.handleNewAd(0, ad)} />
                    <AddListComponent handleClick={(adList) => this.handleNewList(adList)} />
                </div>
                <div id="ads-lists">
                    {listItems}
                </div>
            </div>
        );
    }

    handleNewAd(listId: number, ad: Ad) {
        // let adsList = this.state.adsLists[listId];
        // ad.id = adsList.ads.length;
        // adsList.ads.push(ad);

        // this.persistChanges();
    }

    handleAdChanges(listId: number, ad: Ad) {
        // let adsList = this.state.adsLists[listId];
        // adsList.ads[ad.id] = ad;

        // this.persistChanges();
    }

    handleNewList(adsList: AdsList) {
        // adsList.id = this.state.adsLists.length;
        // this.state.adsLists.push(adsList);

        // this.persistChanges();
    }

    persistChanges() {
        // this.setState({
        //     adsLists: this.state.adsLists
        // });

        //this.adsService.save(this.state.adsLists);
    }
}