import './app.file-imports';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Organizer from './components/organizer.component';
import AddAdComponent from './components/add-ad.component';
import Ad from './models/ad';
import Store from './app.store';

// generic function to bootstrap (angular term?) react application
const bootstrapReact = (selector: string, appComponent: JSX.Element) => {
    const element = document.getElementById(selector);

    if (!element)
        return;

    ReactDOM.render(
        <div>
            <MuiThemeProvider>
                <Provider store={Store}>
                    {appComponent}
                </Provider>
            </MuiThemeProvider>
        </div>,
        element,
    );
};

bootstrapReact('organizer', <Organizer />);
bootstrapReact('browser-action', <AddAdComponent organizerLink={true} dialog={false} />);
