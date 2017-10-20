import * as React from 'react';
import Ad from '../models/ad';
import Store from '../app.store';
import TextareaAutosize from 'react-autosize-textarea';
import { updateAd } from '../actions';

interface IProps {
    ad: Ad;
    listId: number;
}

interface IState {
    name: string;
    link: string;
}

export class AdComponent extends React.Component<IProps, IState> {
    public render(): JSX.Element {
        return (
            <div className="ad">
                <div className="info">
                    <span>{this.props.ad.title}</span>
                    <a href={this.props.ad.link}> Original Ad</a>
                </div>
                <div>
                    <TextareaAutosize
                        className="description"
                        placeholder="description..."
                        onChange={(event) => this.handleChanges(event)}
                        value={this.props.ad.description}>
                    </TextareaAutosize>
                </div>
            </div>
        );
    }

    private handleChanges(event) {
        const ad = this.props.ad;
        ad.description = event.target.value;
        this.props.ad.description = event.target.value;

        updateAd(ad, this.props.listId);
    }
}
