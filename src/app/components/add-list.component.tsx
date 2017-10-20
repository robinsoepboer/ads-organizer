import * as React from 'react';
import AdsList from '../models/adsList';
import Store from '../app.store';
import { createList } from '../actions';

interface IState {
    title: string;
}

export class AddListComponent extends React.Component<{}, IState> {
    constructor(props: {}, context: any) {
        super();

        this.state = {
            title: '',
        };
    }

    public render(): JSX.Element {
        return (
            <div id="add-list-form">
                <h2>add list</h2>
                <div className="form-group">
                    <label htmlFor="list-title">Title:</label>
                    <input id="list-title" type="text"
                        value={this.state.title}
                        onChange={(event) => this.setState({ title: event.target.value })} />
                </div>
                <button onClick={() => this.handleClick()}>add</button>
            </div>
        );
    }

    private handleClick() {
        createList(this.state.title);
        this.setState({ title: '' });
    }
}
