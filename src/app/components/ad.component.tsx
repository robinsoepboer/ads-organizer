import * as React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Ad from '../models/ad';
import Store from '../app.store';
import { updateAd } from '../actions';
import { AdContextMenuComponent } from './ad-menu.component';
import { AdDraggableZoneComponent } from './ad-draggablezone.component';

interface IProps {
    ad: Ad;
    listId: number;
}

export class AdComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return (
            <AdDraggableZoneComponent adId={this.props.ad.id} listId={this.props.listId}>
                <Card>
                    <CardTitle className="info" style={{paddingBottom: 0}}>
                        <FlatButton href={this.props.ad.link}
                            secondary
                            className="original-ad-button">
                            Original Ad
                        </FlatButton>
                        <TextField id="ad-title-input"
                            value={this.props.ad.title}
                            onChange={(event) => this.handleTitleChanges(event)}
                            className="ad-title"></TextField>
                        <AdContextMenuComponent adId={this.props.ad.id} listId={this.props.listId} />
                    </CardTitle>
                    <CardText className="text-area-parent" style={{paddingTop: 0}}>
                        <TextField
                            id="ads-description-field"
                            className="description"
                            placeholder="description..."
                            multiLine={true}
                            textareaStyle={{ fontSize: 12 }}
                            onChange={(event) => this.handleDescriptionChanges(event)}
                            value={this.props.ad.description}>
                        </TextField>
                    </CardText>
                </Card>
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
