/*global someFunction cordova:true*/

export const isNative = () => (process.env.REACT_APP_ENV === 'ios') ? true : false;
export const refreshVideos = () => {
    if (isNative() && cordova && cordova.plugins && cordova.plugins.iosrtc && cordova.plugins.iosrtc.refreshVideos) {
        cordova.plugins.iosrtc.refreshVideos()
    }
}