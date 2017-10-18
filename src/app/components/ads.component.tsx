import * as React from "react";
import { ContextMenuProvider, ContextMenu, Item, Separator, IconFont } from 'react-contexify';
import { AdComponent } from './ad.component';
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
                <div id="ads-list-header">
                    <h2>{this.props.adsList.title}</h2>
                    <ContextMenuProvider id={'adslist-context-menu-' + this.props.adsList.id} className="context-provider" event="onClick">
                        <i className="material-icons">more_vert</i>                          
                    </ContextMenuProvider>                 
                </div>
                {listItems}
                {this.renderContextMenu()}
            </div>
        )
    }

    renderContextMenu(): JSX.Element {
        return (
            <ContextMenu id={'adslist-context-menu-' + this.props.adsList.id}>
                <Item>
                    <IconFont className="material-icons">edit</IconFont>
                    Edit
                </Item>
                <Item>
                    <IconFont className="material-icons">delete</IconFont>
                    delete
                </Item>
            </ContextMenu>
        );
    }
}