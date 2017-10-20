// Necessary file imports for webpack bundling/compiling process. Importing these files ensures that they get carried
// over to the build folder and thus these files will be taken along during distribution

import '../styles/main.less';
import 'file-loader?name=reactcontexify.css!../../node_modules/react-contexify/dist/ReactContexify.css';
import 'file-loader?name=sweetalert.css!../../node_modules/sweetalert/dist/sweetalert.css';

import 'file-loader?name=index.html!../index.html';
import 'file-loader?name=browser-action.html!../browser-action/browser-action.html';
import 'file-loader?name=browser-action.png!../browser-action/browser-action.png';
import 'file-loader?name=manifest.json!../../manifest.json';
