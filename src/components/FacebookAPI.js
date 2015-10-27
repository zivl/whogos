// FB.api(path, method, params, callback)
class FacebookAPI {

    getFriends() {
        FB.api(
            '/me',
            'GET',
            {"fields": "friends{name,events}"},
            (response) => {
                if (response && !response.error) {
                    console.log(response);
                }
            }
        );
    }

    getFriendsEvents() {

    }
}

export default new FacebookAPI();