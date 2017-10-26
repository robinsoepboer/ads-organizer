import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { blue500 } from 'material-ui/styles/colors';
import PlayListAdd from 'material-ui/svg-icons/av/playlist-add';
import Add from 'material-ui/svg-icons/content/add';
import injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

export default class SpeedDialComponent extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <SpeedDial>
                <BubbleList>
                    <BubbleListItem
                        primaryText="List"
                        rightAvatar={ <Avatar backgroundColor={blue500} icon={<PlayListAdd />} /> }
                    />
                    <BubbleListItem
                        primaryText="Ad"
                        rightAvatar={ <Avatar backgroundColor={blue500} icon={<Add />} /> }
                    />
                </BubbleList>
            </SpeedDial>
        );
    }
}
