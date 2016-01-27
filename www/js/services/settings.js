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
        //        var settings = localStorage[_settingsKey];
        //        if (settings)
        //            return angular.fromJson(settings);
        return defaultSettings;
    }

    //    function _saveSettings(settings) {
    //        localStorage[_settingsKey] = angular.toJson(settings);
    //    }
    return {
        get: _retrieveSettings,
        //        set: _saveSettings,
        getServerBaseUrl: function () {
            return _retrieveSettings().serverBaseUrl;
        },
        getSid: function () {
            return _retrieveSettings().sid;
        }
    };
}
