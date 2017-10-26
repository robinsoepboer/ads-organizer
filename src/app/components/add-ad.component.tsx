import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import Ad from '../models/ad';
import AdsService from '../services/ads.service';
import Store from '../app.store';
import { createAd } from '../actions/index';

interface IProps {
    organizerLink: boolean;
    dialog: boolean;
    showDialog?: boolean;
    hideDialog?: () => void;
}

interface IState {
    title: string;
    link: string;
    listId: number;
}

export default class AddAdComponent extends React.Component<IProps, IState> {
    constructor(props: {}, context: any) {
        super();

        this.state = {
            title: '',
            link: '',
            listId: 0,
        };
    }

    public componentDidMount() {
        if (chrome && chrome.tabs) {
            chrome.tabs.getSelected(null, (tab) => this.preFillFields(tab));
        }

        this.subscribeToListChanges();
    }

    public render(): JSX.Element {
        if (this.props.dialog) {
            const actions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onClick={() => this.props.hideDialog()}
                />,
                <FlatButton
                    label="Add"
                    primary={true}
                    keyboardFocused={true}
                    onClick={() => this.handleClick()}
                />,
            ];

            return (
                <Dialog
                    title="New Ad"
                    modal={true}
                    actions={actions}
                    open={this.props.showDialog}
                    onRequestClose={() => this.props.hideDialog()}
                >
                    {this.renderContent()}
                </Dialog>
            );
        }
        return this.renderContent();
    }

    private renderContent(): JSX.Element {
        return (
            <div id="manual-add-dialog">
                <TextField
                    id="ad-title"
                    hintText="Title..."
                    value={this.state.title}
                    fullWidth
                    onChange={(event) => this.setState({ title: event.target.value })}
                    onKeyDown={(event) => this.AddTestDataToApplication(event)}
                />
                <TextField
                    id="ad-link"
                    hintText="Link..."
                    fullWidth
                    value={this.state.link}
                    onChange={(event) => this.setState({ link: event.target.value })}
                />
                {this.renderListSelect()}

                {
                    !this.props.dialog &&
                    <RaisedButton primary label="add" className="btn" onClick={() => this.handleClick()} />
                }

                {this.renderOrganizerLink()}
            </div>
        );
    }

    private renderListSelect(): JSX.Element {
        let listItems;
        const adsLists = Store.getState().adsLists;

        if (adsLists) {
            listItems = adsLists.map((item) => {
                return (
                    <MenuItem key={item.id} value={item.id} primaryText={item.title} />
                );
            });
        }

        return (
            <SelectField
                id="ad-list-id"
                hintText="List..."
                fullWidth
                value={this.state.listId}
                onChange={(event, index, value) => this.setState({ listId: Number(value) })}
            >
                {listItems}
            </SelectField>
        );
    }

    private renderOrganizerLink(): JSX.Element {
        if (this.props.organizerLink) {
            return (
                <a id="organizer-link" onClick={() => this.goToOrganizer()}>Go to organizer</a>
            );
        }
        return;
    }

    private handleClick(): void {
        createAd(new Ad(this.state.title, this.state.link), this.state.listId);
        this.setState({ title: '', link: '' });
        this.props.hideDialog();
    }

    private goToOrganizer(): void {
        if (!chrome || !chrome.tabs)
            return;

        chrome.tabs.create({ url: '/index.html' });
    }

    private preFillFields(tab: chrome.tabs.Tab): void {
        if (tab.title && tab.url) {
            this.setState({
                title: tab.title,
                link: tab.url,
            });
        }
    }

    // Method fills application with test data for convience during development
    private AddTestDataToApplication(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.ctrlKey && event.keyCode === 89) {
            const adsService = new AdsService();
            adsService.saveTestData();
        }
    }

    // The state.listid has to be defaulted to the id of the first list
    private subscribeToListChanges() {
        const unsubscribe = Store.subscribe(() => {
            const adsLists = Store.getState().adsLists;
            if (adsLists[0]) {
                this.setState({ listId: adsLists[0].id });
                unsubscribe();
            }
        });
    }
}
