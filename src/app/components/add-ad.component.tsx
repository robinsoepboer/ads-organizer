import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Ad from '../models/ad';
import AdsService from '../services/ads.service';
import Store from '../app.store';
import { createAd } from '../actions/index';

interface IProps {
    organizerLink: boolean;
}

interface IState {
    title: string;
    link: string;
    listId: number;
}

export class AddAdComponent extends React.Component<IProps, IState> {
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
        return (
            <div id="manual-add-form">
                <h2>Add Ad</h2>
                <div className="form-group">
                    <label htmlFor="ad-title">Title:</label>
                    <input id="ad-title" type="text"
                        value={this.state.title}
                        onChange={(event) => this.setState({ title: event.target.value })}
                        onKeyDown={(event) => this.AddTestDataToApplication(event)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ad-link">Link:</label>
                    <input id="ad-link" type="text"
                        value={this.state.link}
                        onChange={(event) => this.setState({ link: event.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="ad-list-id">List:</label>
                    {this.renderListSelect()}
                </div>
                <RaisedButton primary label="add" className="btn" onClick={() => this.handleClick()} />
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
                    <option key={item.id} value={item.id}>{item.title}</option>
                );
            });
        }

        return (
            <select id="ad-list-id"
                value={this.state.listId}
                onChange={(event) => this.setState({ listId: Number(event.target.value) })}>
                {listItems}
            </select>
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
