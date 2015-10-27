
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

// FB.api(path, method, params, callback)
class FacebookAPI {

    getFriendsEvents(options) {
        FB.api(
            '/me',
            'GET',
            {"fields": "friends{name,events{name, start_time, category, place, picture{url}}}"},
            response => {
                console.log('events',response);
                if (response && !response.error) {
                    options.success && options.success(extractEvents(response));
                } else {
                    options.error && options.error();
                }
            }
        );
    }

    getEventDetails(eventId, options) {
        FB.api(
            `/${eventId}`,
            'GET',
            {"fields": "category,cover,description,start_time,end_time,name,photos{picture},place{name,location{latitude,longitude,name,street,city,country}}"},
            response => {
                console.log('event',response);
                if (response && !response.error) {
                    options.success && options.success(response);
                } else {
                    options.error && options.error();
                }
            }
        );
    }

    login(options) {
        window.fbReady.then(() => {
            FB.login(response => {
                console.log('login', response);
                if (response.status === 'connected') {
                    options.success && options.success();
                } else {
                    options.error && options.error();
                }
            }, {scope: 'user_about_me,user_friends,user_events,email'});
        });
    }

    silentLogin(options) {
        window.fbReady.then(() => {
            FB.getLoginStatus(response => {
                console.log('login', response);
                if (response.status === 'connected') {
                    options.success && options.success();
                } else {
                    options.loginRequired && options.loginRequired();
                }
            });
        });
    }
}

export default new FacebookAPI();