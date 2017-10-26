import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import AdsList from '../models/adsList';
import Store from '../app.store';
import { createList } from '../actions';

interface IProps {
    show: boolean;
    hideDialog: () => void;
}

interface IState {
    title: string;
}

export default class AddListComponent extends React.Component<IProps, IState> {
    constructor(props: {}, context: any) {
        super();

        this.state = {
            title: '',
        };
    }

    public render(): JSX.Element {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.props.hideDialog()}
            />,
            <FlatButton
                label="Add"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.handleClick()}
            />,
        ];

        return (
            <Dialog id="add-list-form"
                title="Ad"
                modal={true}
                actions={actions}
                open={this.props.show}
                onRequestClose={() => this.props.hideDialog()}
            >
                <TextField
                    id="list-title"
                    className="txt"
                    hintText="Title..."
                    fullWidth
                    value={this.state.title}
                    onChange={(event) => this.setState({ title: event.target.value })}
                />
            </Dialog>
        );
    }

    private handleClick() {
        createList(this.state.title);
        this.setState({ title: '' });
        this.props.hideDialog();
    }
}
