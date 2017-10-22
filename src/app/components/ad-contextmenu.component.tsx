import * as React from 'react';
import SweetAlert from 'sweetalert-react';
import { ContextMenu, ContextMenuProvider, IconFont, Item, Separator } from 'react-contexify';
import { deleteAd } from '../actions';

interface IProps {
    adId: number;
    listId: number;
}

interface IState {
    showDeleteConfim: boolean;
}

export class AdContextMenuComponent extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.state = {
            showDeleteConfim: false,
        };
    }

    public render(): JSX.Element {
        return (
            <div>
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
                    text={'This action can\'t be undone!\r\nAre you sure you want to delete this ad?\r\n\r\n'}
                    confirmButtonText="yes, delete ad"
                    confirmButtonColor="red"
                    onConfirm={() => this.deleteAd()}
                    onCancel={() => this.setState({ showDeleteConfim: false })}
                />
            </div>
        );
    }

    private renderContextMenu(): JSX.Element {
        return (
            <ContextMenu id={this.contextMenuId()}>
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

    private deleteAd() {
        setTimeout(() => {
            this.setState({ showDeleteConfim: false });
            deleteAd(this.props.adId, this.props.listId);
        }, 0);
    }

    private contextMenuId(): string {
        return 'ad-context-menu-' + this.props.listId + '-' + this.props.adId;
    }
}
