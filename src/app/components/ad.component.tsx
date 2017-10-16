import * as React from "react";
import Ad from '../models/ad';
import TextareaAutosize from 'react-autosize-textarea';
import Store from '../app.store';

interface IProps {
    ad: Ad;
    listId:number;    
}

interface IState {
    name: string;
    link: string;
}

export class AdComponent extends React.Component<IProps, IState> {
    render(): JSX.Element {
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
        )
    }

    handleChanges(event){
        let ad = this.props.ad;
        ad.description = event.target.value;
        this.props.ad.description = event.target.value;

        Store.dispatch({
            type: 'UPDATE_ADD',
            ad: ad,
            listId: this.props.listId
        })
    }
}