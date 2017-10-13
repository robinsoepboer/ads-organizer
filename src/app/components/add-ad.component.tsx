import * as React from "react";
import Ad from '../models/ad';
import Store from '../stores/app.store';

interface IProps {
}

interface IState {
    title: string;
    link: string;
}

export class AddAdComponent extends React.Component<IProps, IState> {
    constructor(props: {}, context: any) {
        super();

        this.state = {
            title: '',
            link: ''
        }
    }

    render(): JSX.Element {
        return (
            <div id="manual-add-form">
                <h2>Add Ad</h2>
                <div className="form-group">
                    <label>
                        Title:
                        <input type="text" value={this.state.title} onChange={event => this.setState({ title: event.target.value })} />
                    </label>
                </div>
                <div className="form-group">
                    <label >
                        Link:
                        <input type="text" value={this.state.link} onChange={event => this.setState({ link: event.target.value })} />
                    </label>
                </div>
                <button onClick={() => this.handleClick()}>add</button>
            </div>
        );
    }

    handleClick(){
        Store.dispatch({
            type: 'ADD_AD',
            ad: new Ad(this.state.title, this.state.link),
            listId: 0
        })
        
        this.setState({title:'', link:''});
    }
}