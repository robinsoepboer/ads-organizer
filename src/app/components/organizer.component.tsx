import * as React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { AdsComponent } from './ads.component';
import { AddAdComponent } from './add-ad.component';
import { AddListComponent } from './add-list.component';

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
                return (
                    <AdsComponent key={item.id} adsList={item} />
                );
            });
        }

        return (
            <div>
                <div id="add-forms">
                    <AddAdComponent organizerLink={false} />
                    <AddListComponent />
                </div>
                <div id="ads-lists">
                    {listItems}
                </div>
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
