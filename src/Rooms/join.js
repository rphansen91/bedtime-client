const RTCMultiConnection = window.RTCMultiConnection;
const Firebase = window.Firebase;

const query = () =>
    window.location.search
    .replace('?','')
    .split('&')
    .map(s => s.split('='))
    .reduce((p, c) => {
        p[c[0]] = c[1];
        return p;
    }, {});

const bedroomToken = connection => {
    console.log(window.location.hash);
    return window.location.hash.replace('#/','') || connection.token();
}

export default (user, onConnection) => {
    console.log("USER", user);
    const connection = new RTCMultiConnection();
    connection.firebase = 'bedtime-stories';
    connection.channel = bedroomToken(connection);

    const firebaseURL = 'https://' + connection.firebase + '.firebaseio.com/rooms/';
    const bedroom = new Firebase(firebaseURL + connection.channel);

    connection.onstream = (e) => {
        bedroom.once('value', function (data) {
            onConnection(e, data.val());
        })
    };

    return new Promise((res, rej) => {
        bedroom.once('value', function (data) {
            var bedroomData = data.val();
            console.log("SESSION", bedroomData);
            if (!bedroomData) {
                connection.open({
                    sessionid: connection.sessionid,
                    captureUserMediaOnDemand: false,
                    dontTransmit: true,
                    onMediaCaptured: function(e) {
                        console.log("onMediaCaptured", e, connection.sessionDescription);
                        bedroom.set({
                            session: connection.sessionDescription,
                            members: [user]
                        });
                        bedroom.onDisconnect().remove();
                        res(connection);
                    }
                });
            } else {
                console.log(bedroomData.session);
                bedroomData.members.push(user);
                bedroom.set(bedroomData);
                connection.join(bedroomData.session, {
                    audio: true,
                    video: true
                });
                res(connection);
            }

            console.debug('room is present?', bedroomData == null);
        });
    });
}
