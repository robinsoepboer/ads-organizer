import * as React from "react";
import Ad from '../models/ad';
import Store from '../stores/app.store';

interface IProps {
}

interface IState {
    title: string;
    link: string;
    listId: number;
}

export class AddAdComponent extends React.Component<IProps, IState> {
    constructor(props: {}, context: any) {
        super();

        this.state = {
            title: '',
            link: '',
            listId: 0
        }
    }

    render(): JSX.Element {
        return (
            <div id="manual-add-form">
                <h2>Add Ad</h2>
                <div className="form-group">
                    <label htmlFor="ad-title">Title:</label>
                    <input id="ad-title" type="text" value={this.state.title} onChange={event => this.setState({ title: event.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="ad-link">Link:</label>
                    <input id="ad-link" type="text" value={this.state.link} onChange={event => this.setState({ link: event.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="ad-list-id">List:</label>
                    {this.renderListSelect()}
                </div>
                <button onClick={() => this.handleClick()}>add</button>
            </div>
        );
    }

    renderListSelect(): JSX.Element {
        var listItems = Store.getState().adsLists.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.title}</option>
            );
        });

        return (
            <select id="ad-list-id" 
                value={this.state.listId} 
                onChange={event => this.setState({ listId: Number(event.target.value) }) }>
                {listItems}
            </select>
        );
    }

    handleClick(): void {
        Store.dispatch({
            type: 'ADD_AD',
            ad: new Ad(this.state.title, this.state.link),
            listId: this.state.listId
        })

        this.setState({ title: '', link: '' });
    }
}