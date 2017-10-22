import * as React from 'react';
import { ContextMenuProvider, ContextMenu, Item, Separator, IconFont } from 'react-contexify';
import SweetAlert from 'sweetalert-react';

interface IState {
    showDeleteConfim: boolean;
}

interface IProps {
    listId: number;
    deleteList: () => void;
    makeEditable: () => void;
}

export class AdsContextMenuComponent extends React.Component<IProps, IState> {

    private titleInput: HTMLInputElement;

    constructor() {
        super();

        this.state = {
            showDeleteConfim: false,
        };
    }

    public render(): JSX.Element {
        return (
            <div className="ads-contextmenu-component">
                <ContextMenuProvider
                    id={this.contextMenuId()}
                    className="context-provider"
                    event="onClick"
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
                    onConfirm={() => {
                        this.setState({ showDeleteConfim: false });
                        this.props.deleteList();
                    }}
                    onCancel={() => this.setState({ showDeleteConfim: false })}
                />
            </div>
        );
    }

    private renderContextMenu(): JSX.Element {
        return (
            <ContextMenu id={this.contextMenuId()}>
                <Item onClick={() => this.props.makeEditable()}>
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

    private openConfirmDialog(): void {
        setTimeout(() => {
            this.setState({ showDeleteConfim: true });
        }, 0);
    }

    private contextMenuId(): string {
        return 'adslist-context-menu-' + this.props.listId;
    }
}
