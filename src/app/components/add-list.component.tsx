import * as React from "react";
import AdsList from '../models/adsList';
import Store from '../stores/app.store';

interface IProps {
}

interface IState {
    title: string;
}

export class AddListComponent extends React.Component<IProps, IState> {
    unsubscribe;

    constructor(props: {}, context: any) {
        super();

        this.state = {
            title: ''
        }
    }

    render(): JSX.Element {
        return (
            <div id="add-list-form">
                <h2>add list</h2>
                <div className="form-group">
                    <label>
                        Title:
                        <input type="text" value={this.state.title} onChange={event => this.setState({ title: event.target.value })} />
                    </label>
                </div>
                <button onClick={() => this.handleClick()}>add</button>
            </div>
        );
    }

    handleClick(){
        Store.dispatch({
            type: 'ADD_LIST',
            listTitle: this.state.title
        });

        this.setState({title: ''});
    }
}