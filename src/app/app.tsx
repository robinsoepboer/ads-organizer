import "../assets/main.less";
import "file-loader?name=index.html!../index.html";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { TwoComponent } from "./components/two.component";
import Ad from './models/ad';

ReactDOM.render(
    <div>
        <TwoComponent />
    </div>,
    document.getElementById("root")
);