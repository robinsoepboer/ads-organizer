import "./app.file-imports";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { OrganizerComponent } from "./components/organizer.component";
import { AddAdComponent } from "./components/add-ad.component";
import Ad from './models/ad';

if(document.getElementById("organizer")){    
    ReactDOM.render(
        <div>
            <OrganizerComponent />
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