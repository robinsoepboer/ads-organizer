import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
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
            <div className="ads-menu-component">
                <IconMenu
                    className="context-provider"
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    iconStyle={{ width: 20, height: 20 }}
                >
                    <MenuItem
                        primaryText="Edit"
                        leftIcon={<EditIcon />}
                        onClick={() => this.props.makeEditable()} />
                    <MenuItem
                        primaryText="Delete"
                        leftIcon={<DeleteIcon />}
                        onClick={() => this.openConfirmDialog()} />
                </IconMenu>
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

    private openConfirmDialog(): void {
        setTimeout(() => {
            this.setState({ showDeleteConfim: true });
        }, 0);
    }

    private contextMenuId(): string {
        return 'adslist-context-menu-' + this.props.listId;
    }
}
