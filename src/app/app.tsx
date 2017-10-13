import "../styles/main.less";
import "file-loader?name=index.html!../index.html";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { OrganizerComponent } from "./components/organizer.component";
import Ad from './models/ad';

ReactDOM.render(
    <div>
        <OrganizerComponent />
    </div>,
    document.getElementById("root")
);