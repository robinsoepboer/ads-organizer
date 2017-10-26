import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { blue500 } from 'material-ui/styles/colors';
import PlayListAdd from 'material-ui/svg-icons/av/playlist-add';
import Add from 'material-ui/svg-icons/content/add';
import injectTapEventPlugin = require('react-tap-event-plugin');
import { AddAdComponent } from './add-ad.component';

injectTapEventPlugin();

interface IState {
    showAd: boolean;
    open: boolean;
}

export default class SpeedDialComponent extends React.Component<{}, IState> {
    constructor() {
        super();

        this.state = {
            open: false,
            showAd: false,
        };
    }

    public render(): JSX.Element {
        return (
            <div>
                <SpeedDial isOpen={this.state.open} onChange={() => { const test = 0; }} >
                    <BubbleList>
                        <BubbleListItem
                            primaryText="List"
                            rightAvatar={<Avatar backgroundColor={blue500} icon={<PlayListAdd />} />}
                        />
                        <BubbleListItem
                            primaryText="Ad"
                            rightAvatar={<Avatar backgroundColor={blue500} icon={<Add />} />}
                            onTouchTap={() => this.setState({ showAd: true, open: false }) }
                        />
                    </BubbleList>
                </SpeedDial>
                <AddAdComponent
                    organizerLink={false}
                    dialog={true}
                    showDialog={this.state.showAd}
                    hideDialog={() => this.setState({ showAd: false })}
                />
            </div>
        );
    }
}
