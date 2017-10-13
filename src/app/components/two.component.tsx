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
        let adsLists = Store.getState().adsLists;

        if (adsLists.length === 0) {
            adsLists.push(new AdsList(0, 'Default - Ads'));
        }

        if (this.state.adsLists)
            this.setState({ adsLists: adsLists });

        this.unsubscribe = Store.subscribe(this.handleChange.bind(this))
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleChange() {
        this.setState({
            adsLists: Store.getState().adsLists
        });
    }

    render(): JSX.Element {

        var listItems = this.state.adsLists.map((item) => {
            return (
                <AdsComponent key={item.id} adsList={item} />
            );
        });

        return (
            <div>
                <div id="add-forms">
                    <AddAdComponent />
                    <AddListComponent />
                </div>
                <div id="ads-lists">
                    {listItems}
                </div>
            </div>
        );
    }
}