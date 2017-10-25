import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
                <h2>Add List</h2>
                <TextField
                    id="list-title"
                    className="txt"
                    hintText="Title..."
                    fullWidth
                    value={this.state.title}
                    onChange={(event) => this.setState({ title: event.target.value })}
                />
                <RaisedButton primary label="add" className="btn" onClick={() => this.handleClick()} />
            </div>
        );
    }

    private handleClick() {
        createList(this.state.title);
        this.setState({ title: '' });
    }
}
