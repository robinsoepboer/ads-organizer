import * as React from 'react';
import { AdComponent } from './ad.component';
import AdsList from '../models/adsList';
import { updateList, deleteList } from '../actions';
import { AdsContextMenuComponent } from './ads-contextmenu.component';

interface IState {
    editable: boolean;
    title: string;
}

interface IProps {
    adsList: AdsList;
}

export class AdsComponent extends React.Component<IProps, IState> {

    private titleInput: HTMLInputElement;

    constructor() {
        super();

        this.state = {
            editable: false,
            title: '',
        };
    }

    public componentDidMount(): void {
        this.setState({ title: this.props.adsList.title });
    }

    public render(): JSX.Element {

        const listItems = this.props.adsList.ads.map((item) => {
            return (
                <AdComponent key={item.link} ad={item} listId={this.props.adsList.id} />
            );
        });

        return (
            <div className="ads-list">
                <div className="ads-list-header">
                    <h2 className={this.state.editable ? 'hidden' : ''}>{this.props.adsList.title}</h2>
                    {this.renderTitleInputField()}
                    <AdsContextMenuComponent
                        listId={this.props.adsList.id}
                        deleteList={() => this.deleteList()}
                        makeEditable={() => this.makeEditable()}
                    />
                </div>
                {listItems}
            </div>
        );
    }

    private renderTitleInputField(): JSX.Element {
        return (
            <div className={'editable-adslist-header ' + (!this.state.editable ? 'hidden' : '')}>
                <input id="ad-list-edit-title" type="text"
                    value={this.state.title}
                    onChange={(event) => this.setState({ title: event.target.value })}
                    ref={(input) => { this.titleInput = input; }}
                />
                <button className="btn-transparent" onClick={() => this.doneEditing()}>
                    <i className="material-icons">done</i>
                </button>
                <button className="btn-transparent" onClick={() => this.cancelEditing()}>
                    <i className="material-icons">clear</i>
                </button>
            </div>
        );
    }

    private makeEditable(): void {
        setTimeout(() => {
            this.setState({ editable: true });
            this.titleInput.focus();
        }, 0);
    }

    private doneEditing(): void {
        this.setState({ editable: false });
        updateList(this.state.title, this.props.adsList.id);
    }

    private cancelEditing(): void {
        this.setState({
            editable: false,
            title: this.props.adsList.title,
         });
    }

    private deleteList(): void {
        deleteList(this.props.adsList.id);
    }
}
