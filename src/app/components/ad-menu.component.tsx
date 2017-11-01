import * as React from 'react';
import SweetAlert from 'sweetalert-react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
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
                <IconMenu className="context-provider" iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                    <MenuItem
                        primaryText="Delete"
                        leftIcon={<DeleteIcon />}
                        onClick={() => this.openConfirmDialog()} />
                </IconMenu>
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
}
