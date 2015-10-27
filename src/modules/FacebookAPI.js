
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