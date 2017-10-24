import * as React from 'react';
import Ad from '../models/ad';
import Store from '../app.store';
import TextareaAutosize from 'react-autosize-textarea';
import { updateAd } from '../actions';
import { AdContextMenuComponent } from './ad-contextmenu.component';
import { AdDraggableZoneComponent } from './ad-draggablezone.component';

interface IProps {
    ad: Ad;
    listId: number;
}

export class AdComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return (
            <AdDraggableZoneComponent adId={this.props.ad.id} listId={this.props.listId}>
                <div className="info">
                    <a href={this.props.ad.link}> Original Ad</a>
                    <input value={this.props.ad.title}
                        onChange={(event) => this.handleTitleChanges(event)}></input>
                    <AdContextMenuComponent adId={this.props.ad.id} listId={this.props.listId} />
                </div>
                <div className="text-area-parent">
                    <TextareaAutosize
                        className="description"
                        placeholder="description..."
                        onChange={(event) => this.handleDescriptionChanges(event)}
                        value={this.props.ad.description}>
                    </TextareaAutosize>
                </div>
            </AdDraggableZoneComponent>
        );
    }

    private handleDescriptionChanges(event) {
        const ad = this.props.ad;
        ad.description = event.target.value;

        updateAd(ad, this.props.listId);
    }

    private handleTitleChanges(event) {
        const ad = this.props.ad;
        ad.title = event.target.value;

        updateAd(ad, this.props.listId);
    }
}
