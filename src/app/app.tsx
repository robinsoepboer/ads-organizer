import "./app.file-imports";
import * as React from "react";
import { Provider } from 'react-redux'
import * as ReactDOM from "react-dom";

import Organizer from "./components/organizer.component";
import { AddAdComponent } from "./components/add-ad.component";
import Ad from './models/ad';
import Store from './app.store';

if(document.getElementById("organizer")){    
    ReactDOM.render(
        <div>
            <Provider store={Store}>
                <Organizer />                
            </Provider>
        </div>,
        document.getElementById("organizer")
    );
}
else if (document.getElementById("browser-action")){
    ReactDOM.render(
        <div>
            <AddAdComponent organizerLink={true} />
        </div>,
        document.getElementById("browser-action")
    );
}