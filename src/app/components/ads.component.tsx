import * as React from "react";
import { AdComponent } from './ad.component';
import Ad from '../models/ad';
import AdsList from '../models/adsList';

interface IProps {
    adsList: AdsList;
}

export class AdsComponent extends React.Component<IProps, {}> {
    render(): JSX.Element {

        var listItems = this.props.adsList.ads.map((item) => {
            return (
                <AdComponent key={item.link} ad={item} listId={this.props.adsList.id} />
            );
        });

        return (
            <div className="ads-list">
                <h2>{this.props.adsList.title}</h2>
                {listItems}
            </div>
        )
    }
}