angular
    .module('ApproverApp')
    .factory('SettingsFactory', settingsFactory);

settingsFactory.$inject = ['ServerUrl', 'ERP'];

function settingsFactory(ServerUrl, ERP) {
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
            return ERP;
                //            return _retrieveSettings().serverBaseUrl;
        },
        getSid: function () {
            return _retrieveSettings().sid;
        },
        getReviewServerBaseUrl: function () {
            return ServerUrl;
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
