angular
    .module('ApproverApp')
    .factory('SettingsFactory', settingsFactory);

FileFactory.$inject = ['ServerUrl'];

function settingsFactory(ServerUrl) {

    var _settingsKey = "appSettings",
        defaultSettings = {
            //            serverBaseUrl: '/api',
            serverBaseUrl: ServerUrl,
            language: 'en'
        };

    function _retrieveSettings() {
        return defaultSettings;
    }

    return {
        get: _retrieveSettings,
        getServerBaseUrl: function () {
            return _retrieveSettings().serverBaseUrl;
        },
        getSid: function () {
            return _retrieveSettings().sid;
        },
        getReviewServerBaseUrl: function () {
            return 'http://192.168.31.124:1337';
        }
    };
}
