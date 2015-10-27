/**
 * Created by omerp on 10/27/2015.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FaceBookAPI from '../modules/FacebookAPI';

export default class EventsList extends React.Component {

    state = {
        events: []
    }

    componentWillMount() {
        FaceBookAPI.getFriendsEvents({

            success: this.friendEventsSuccess

        });
    }

    friendEventsSuccess = events => {
        console.log(events);
        this.setState({events});
    }

    renderEvent = (eventData, key) => {
        var description = eventData.description;
        return (
            <div className="event-item" key={key}>
                <div className="name">{eventData.name}</div>
                <div className="description">{description && (description.substring(0, 50) + '...')}</div>
                <div className="end-date">{eventData['end_time']}</div>
                <div>{this.renderEventLocation(eventData.place)}</div>
                <div>{eventData['start_time']}</div>
                <div>{eventData.id}</div>
                <div>{eventData.rsvp_status}</div>
            </div>
        );
    }

    renderEventLocation(place) {
        if(place) {

        }

        return (
            <div>Location place holder</div>
        );
    }

    render() {
        return (
            <div>{this.state.events.map(this.renderEvent)}</div>
        );
    }
}