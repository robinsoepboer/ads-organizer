import * as React from "react";
import AdsList from '../models/adsList';

interface IProps {
    handleClick: Function;
}

interface IState {
    title: string;
}

export class AddListComponent extends React.Component<IProps, IState> {
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
        this.props.handleClick(new AdsList(0, this.state.title));
        
        this.setState({
            title:''
        })
    }
}