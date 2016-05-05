angular
    .module('ApproverApp')
    .factory('SettingsFactory', settingsFactory);

settingsFactory.$inject = ['ServerUrl'];

function settingsFactory(ServerUrl) {
    var _settingsKey = "appSettings",
        defaultSettings = {
            serverBaseUrl: '/api',
            reviewServerBaseUrl: '/review',
            language: 'en'
        };

    return {
        get: _retrieveSettings,
        set: _saveSettings,
        getERPServerBaseUrl: function () {
            return 'http://192.168.31.195:8080'
                //            return _retrieveSettings().serverBaseUrl;
        },
        getSid: function () {
            return _retrieveSettings().sid;
        },
        getReviewServerBaseUrl: function () {
            return 'http://192.168.31.195:1337';
        }
    };

    function _retrieveSettings() {
        var settings = localStorage[_settingsKey];
        if (settings)
            return angular.fromJson(settings);
        return defaultSettings;
    }

    function _saveSettings(settings) {
        localStorage[_settingsKey] = angular.toJson(settings);
    }
}
