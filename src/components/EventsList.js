/**
 * Created by omerp on 10/27/2015.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FaceBookAPI from '../modules/FacebookAPI';
import Header from './Header';
import { history } from 'react-router/lib/BrowserHistory';
import '../../style/eventlist.scss';
import '../../style/filters.scss';

export default class EventsList extends React.Component {

    state = {
        events: [],
        filterMode: false,
        filters: {}
    }

    componentWillMount() {
        FaceBookAPI.getFriendsEvents({
            success: this.friendEventsSuccess
        });
    }

    friendEventsSuccess = events => {
        this.setState({events});
    }

    eventDetailsWrapper(eventId) {
        return () => {
            history.pushState({}, `/whogos/event/${eventId}`);
        };
    }

    openCloseFilters = () => {
        this.setState({filterMode: !this.state.filterMode});
    }

    renderEvent = (eventData) => {
        var picture = eventData.picture;
        var date = new Date(eventData.start_time);
        var dateString = date.toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long',
            hour12: false
        });
        return (
            <div className='event-item' key={eventData.id} onClick={this.eventDetailsWrapper(eventData.id)}>
                <div className='image-wrapper'>
                    {
                        picture && picture.data && picture.data.url &&
                        <img src={picture.data.url} className='photo'/>
                    }
                </div>
                <div className='event-desc'>
                    <div className='name truncate'>{eventData.name}</div>
                    <div className='date-time'>{dateString}</div>
                </div>
            </div>
        );
    }

    genAddRemoveFilterFunc(category) {
        return () => {

        };
    }

    render() {
        return (
            <div>
                <Header>
                    <span className='right-button' onClick={this.openCloseFilters}>Filters</span>
                </Header>
                {
                    this.state.filterMode &&
                    <div className="offcanvas-filters">
                        <div className="filter-row">
                            <div className="filter"><img src="/images/burger.png"/><div>Food</div></div>
                            <div className="filter"><img src="/images/music-icon.png"/><div>Music</div></div>
                        </div>
                        <div className="filter-row">
                            <div className="filter"><img src="/images/icon-educate.png"/><div>Educate</div></div>
                            <div className="filter"><img src="/images/sport-icon.png"/><div>Sports</div></div>
                        </div>
                        <div className="filter-row">
                            <div className="filter"><img src="/images/art-icon.png"/><div>Art</div></div>
                            <div className="filter"><img src="/images/party-icon.png"/><div>Party</div></div>
                        </div>
                    </div>
                }
                <div className='events-list'>{this.state.events.map(this.renderEvent)}</div>
            </div>
        );
    }
}