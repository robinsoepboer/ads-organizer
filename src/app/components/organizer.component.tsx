import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { AdsComponent } from './ads.component';
import { AdsDropZoneComponent } from './ads-dropzone.component';
import SpeedDialComponent from './speed-dial.component';

import AdsList from '../models/adsList';
import Ad from '../models/ad';
import Store from '../app.store';
import mainReducer from '../reducers/main.reducer';

@DragDropContext(HTML5Backend)
class OrganizerComponent extends React.Component<any, any> {

    public componentDidMount() {
        if (this.props.adsLists.length === 0) {
            this.props.adsLists.push(new AdsList(0, 'Default - Ads'));
        }
    }

    public render(): JSX.Element {
        let listItems;

        if (this.props.adsLists) {
            listItems = this.props.adsLists.map((item) => {
                return [
                    <AdsComponent key={item.id} adsList={item} />,
                    <AdsDropZoneComponent key={'dropzone-' + item.id} insertedAfter={item.id} />,
                ];
            });
        }

        return (
            <div>
                <AppBar title="Ads Organizer" />
                <div id="ads-lists">
                    <AdsDropZoneComponent insertedAfter={0} />
                    {listItems}
                </div>
                <SpeedDialComponent />
            </div>
        );
    }
}

const mapStateToProps = (state) => mainReducer(state, {});

const bindActionsToDispatch = (dispatch) =>
    (
        {
            //
        }
    );

const ConnectedOrganizer = connect(mapStateToProps, bindActionsToDispatch)(OrganizerComponent);
export default ConnectedOrganizer;
