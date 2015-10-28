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
            var filters = this.state.filters;
            if(filters[category]) {
                delete filters[category];
            }
            else {
                filters[category] = true;
            }
            this.setState({filters});
            console.log(filters);
        };
    }

    filterEvent = (event) => {
        if(Object.keys(this.state.filters).length) {
            return this.state.filters[event.category];
        }
        return true;
    }

    /*
     NEIGHBORHOOD
     FAMILY_EVENT
     MUSIC_EVENT
     DANCE_EVENT
     FESTIVAL_EVENT
     ART_EVENT
     DINING_EVENT
     */
    render() {
        return (
            <div>
                <Header>
                    <span className='filters' onClick={this.openCloseFilters}>Filters</span>
                </Header>
                {
                    this.state.filterMode &&
                    <div className="offcanvas-filters">
                        <div className="filter-row">
                            <div className="filter" onClick={this.genAddRemoveFilterFunc('DINING_EVENT')}>
                                <img src="/images/burger.png"/>
                                <div>Food</div>
                            </div>
                            <div className="filter" onClick={this.genAddRemoveFilterFunc('MUSIC_EVENT')}>
                                <img src="/images/music-icon.png"/>
                                <div>Music</div>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter" onClick={this.genAddRemoveFilterFunc('EDUCATION_EVENT')}>
                                <img src="/images/icon-educate.png"/><div>Educate</div>
                            </div>
                            <div className="filter" onClick={this.genAddRemoveFilterFunc('SPORT_EVENT')}>
                                <img src="/images/sport-icon.png"/><div>Sports</div>
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter"><img src="/images/art-icon.png" onClick={this.genAddRemoveFilterFunc('ART_EVENT')}/>
                                <div>Art</div>
                            </div>
                            <div className="filter"><img src="/images/party-icon.png" onClick={this.genAddRemoveFilterFunc('FESTIVAL_EVENT')}/><div>Party</div></div>
                        </div>
                    </div>
                }
                <div className='events-list'>{this.state.events.filter(this.filterEvent).map(this.renderEvent)}</div>
            </div>
        );
    }
}