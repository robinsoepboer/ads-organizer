import * as React from 'react';
import { ContextMenuProvider, ContextMenu, Item, Separator, IconFont } from 'react-contexify';
import Ad from '../models/ad';
import Store from '../app.store';
import TextareaAutosize from 'react-autosize-textarea';
import { updateAd } from '../actions';
import { AdContextMenuComponent } from './ad-contextmenu.component';
import { DragSource } from 'react-dnd';

interface IProps {
    ad: Ad;
    listId: number;
}

/**
 * Implements the drag source contract.
 */
const adSource = {
    beginDrag(props) {
        return {
        };
    },
};

@DragSource('Ad', adSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export class AdComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return (this.props as any).connectDragSource(
            <div className="ad" style={{opacity: (this.props as any).isDragging ? 0.5 : 1}}>
                <div className="info">
                    <a href={this.props.ad.link}> Original Ad</a>
                    <input value={this.props.ad.title}
                        onChange={(event) => this.handleTitleChanges(event)}></input>
                    <AdContextMenuComponent adId={this.props.ad.id} listId={this.props.listId} />
                    <i className="material-icons move">open_with</i>
                </div>
                <div className="text-area-parent">
                    <TextareaAutosize
                        className="description"
                        placeholder="description..."
                        onChange={(event) => this.handleDescriptionChanges(event)}
                        value={this.props.ad.description}>
                    </TextareaAutosize>
                </div>
            </div>);
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
