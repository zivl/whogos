
function extractEvents(response) {
    var events = [];
    if(response.friends && response.friends.data) {
        response.friends.data.forEach(friend => {
            if (friend.events) {
                events.push(...friend.events.data);
            }
        });
    }
    return events;
}

var whogosUserId = null;
var whogosCachedEvents = null;

// FB.api(path, method, params, callback)
class FacebookAPI {

    getFriendsEvents(options) {
        if (whogosCachedEvents !== null) {
            setTimeout(() => options.success(whogosCachedEvents), 300);
        } else {
            FB.api(
                '/me',
                'GET',
                {"fields": "friends{name,events{name, start_time, category, place, picture{url}}}"},
                response => {
                    console.log('events',response);
                    if (response && !response.error) {
                        whogosCachedEvents = extractEvents(response);
                        options.success && options.success(whogosCachedEvents);
                    } else {
                        options.error && options.error();
                    }
                }
            );
        }
    }

    getEventDetails(eventId, options) {
        FB.api(
            `/${eventId}`,
            'GET',
            {"fields": "name,start_time,description,category,cover,attending,attending_count,place{name,location{name,street,city,country,latitude,longitude}}"},
            response => {
                console.log('event', response);
                if (response && !response.error) {
                    options.success && options.success(response);
                } else {
                    options.error && options.error();
                }
            }
        );
    }

    getEventStatus(eventId, options) {
        FB.api(
            `${eventId}/attending/${whogosUserId}`,
            'GET',
            {},
            response => {
                console.log('event status', response);
                if (response && !response.error) {
                    var isAttending = !!(response.data && response.data.length && (response.data[0].rsvp_status === 'attending'));
                    options.success && options.success(isAttending);
                } else {
                    options.error && options.error();
                }
            }
        );
    }

    joinEvent(eventId, options) {
        FB.api(
            `${eventId}/attending`,
            'POST',
            {},
            response => {
                console.log('join event', response);
                if (response && !response.error && response.success) {
                    options.success && options.success();
                } else {
                    options.error && options.error();
                }
            }
        )
    }

    login(options) {
        window.fbReady.then(() => {
            FB.login(response => {
                console.log('login', response);

                if (response.status === 'connected') {
                    whogosUserId = response.authResponse.userID;
                    options.success && options.success();
                } else {
                    options.error && options.error();
                }
            }, {scope: 'user_about_me,user_friends,user_events,email,rsvp_event'});
        });
    }

    silentLogin(options) {
        window.fbReady.then(() => {
            FB.getLoginStatus(response => {
                console.log('login', response);

                if (response.status === 'connected') {
                    whogosUserId = response.authResponse.userID;
                    options.success && options.success();
                } else {
                    options.loginRequired && options.loginRequired();
                }
            }, {scope: 'user_about_me,user_friends,user_events,email,rsvp_event'});
        });
    }
}

export default new FacebookAPI();