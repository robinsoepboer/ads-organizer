import * as React from 'react';
import { ContextMenuProvider, ContextMenu, Item, Separator, IconFont } from 'react-contexify';
import { AdComponent } from './ad.component';
import AdsList from '../models/adsList';
import { updateList } from '../actions';

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
                    <ContextMenuProvider id={'adslist-context-menu-' + this.props.adsList.id}
                        className="context-provider" event="onClick"
                    >
                        <button className="btn-transparent">
                            <i className="material-icons">more_vert</i>
                        </button>
                    </ContextMenuProvider>
                    {this.renderContextMenu()}
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
                    <i className="material-icons">check</i>
                </button>
            </div>
        );
    }

    private renderContextMenu(): JSX.Element {
        return (
            <ContextMenu id={'adslist-context-menu-' + this.props.adsList.id}>
                <Item onClick={() => this.makeEditable()}>
                    <IconFont className="material-icons">edit</IconFont>
                    Edit
                </Item>
                <Item>
                    <IconFont className="material-icons">delete</IconFont>
                    delete
                </Item>
            </ContextMenu>
        );
    }

    private makeEditable(): void {
        setTimeout(() => {
            this.setState({ editable: true });
            this.titleInput.focus();
        }, 0);
    }

    private doneEditing() {
        this.setState({ editable: false });
        updateList(this.state.title, this.props.adsList.id);
    }
}
