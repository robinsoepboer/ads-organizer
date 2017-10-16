import * as React from "react";
import Ad from '../models/ad';
import Store from '../app.store';
import AdsService from '../services/ads.service';

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
            listId: 0
        }
    }

    componentDidMount() {
        if(chrome && chrome.tabs){
            chrome.tabs.getSelected(null, (tab) => this.preFillFields(tab));
        }
    }

    render(): JSX.Element {
        return (
            <div id="manual-add-form">
                <h2>Add Ad</h2>
                <div className="form-group">
                    <label htmlFor="ad-title">Title:</label>
                    <input id="ad-title" type="text" 
                           value={this.state.title} 
                           onChange={event => this.setState({ title: event.target.value })} 
                           onKeyDown={event => this.AddTestDataToApplication(event)}
                           />
                </div>
                <div className="form-group">
                    <label htmlFor="ad-link">Link:</label>
                    <input id="ad-link" type="text" value={this.state.link} onChange={event => this.setState({ link: event.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="ad-list-id">List:</label>
                    {this.renderListSelect()}
                </div>
                <button onClick={() => this.handleClick()}>add</button>
                {this.renderOrganizerLink()}
            </div>
        );
    }

    renderListSelect(): JSX.Element {
        let listItems; 
        let adsLists = Store.getState().adsLists;

        if(adsLists){
            listItems = adsLists.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.title}</option>
                );
            });
        }

        return (
            <select id="ad-list-id" 
                value={this.state.listId} 
                onChange={event => this.setState({ listId: Number(event.target.value) }) }>
                {listItems}
            </select>
        );
    }

    renderOrganizerLink(): JSX.Element{
        if(this.props.organizerLink){
            return (
                <a id="organizer-link" onClick={() => this.goToOrganizer()}>Go to organizer</a>
            );
        }
        return;
    }

    handleClick(): void {
        Store.dispatch({
            type: 'ADD_AD',
            ad: new Ad(this.state.title, this.state.link),
            listId: this.state.listId
        })

        this.setState({ title: '', link: '' });
    }

    goToOrganizer(): void {
        if(!chrome || !chrome.tabs)
            return;

        chrome.tabs.create({url: '/index.html'});
    }

    preFillFields(tab: chrome.tabs.Tab): void {
        if(tab.title && tab.url){
            this.setState({
                title: tab.title,
                link: tab.url
            });
        }
    }

    //Method fills application with test data for convience during development
    AddTestDataToApplication(event: React.KeyboardEvent<HTMLInputElement>){
        if(event.ctrlKey && event.keyCode === 89){
            let adsService = new AdsService();
            adsService.saveTestData();
        }
    }
}