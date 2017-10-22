import * as React from 'react';
import { ContextMenuProvider, ContextMenu, Item, Separator, IconFont } from 'react-contexify';
import SweetAlert from 'sweetalert-react';
import { AdComponent } from './ad.component';
import AdsList from '../models/adsList';
import { updateList, deleteList } from '../actions';

interface IState {
    editable: boolean;
    title: string;
    showDeleteConfim: boolean;
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
            showDeleteConfim: false,
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
                    <SweetAlert
                        show={this.state.showDeleteConfim}
                        showCancelButton
                        title="Are you sure?"
                        text={'This action can\'t be undone!\r\nAre you sure you want to delete this list?\r\n\r\n' +
                            'All ads contained in this list will be deleted as well!'}
                        confirmButtonText="yes, delete list"
                        confirmButtonColor="red"
                        onConfirm={() => this.deleteList()}
                        onCancel={() => this.setState({ showDeleteConfim: false })}
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

    private renderContextMenu(): JSX.Element {
        return (
            <ContextMenu id={'adslist-context-menu-' + this.props.adsList.id}>
                <Item onClick={() => this.makeEditable()}>
                    <IconFont className="material-icons">edit</IconFont>
                    Edit
                </Item>
                <Item onClick={() => this.openConfirmDialog()}>
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

    private openConfirmDialog(): void {
        setTimeout(() => {
            this.setState({ showDeleteConfim: true });
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

    private deleteList() {
        this.setState({ showDeleteConfim: false });
        deleteList(this.props.adsList.id);
    }
}
