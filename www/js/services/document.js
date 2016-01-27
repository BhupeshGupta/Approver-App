angular
    .module('ApproverApp')
    .factory('DocumentService', documentService);

FileFactory.$inject = ['$http', 'ServerUrl'];

function documentService($http, SettingsFactory) {
    var factory = {
        search: function (documentType, query, filters) {
            var data = {
                txt: query,
                doctype: documentType,
                cmd: 'frappe.widgets.search.search_link',
                _type: 'GET',
                filters: JSON.stringify(filters),
                sid: SettingsFactory.getSid()
            };

            var url = SettingsFactory.getERPServerBaseUrl() + '?' + $.param(data);
            return $http({
                url: url,
                loading: true,
                method: 'GET'
            });
        },
        create: function (documentType, document) {
            return $http.post(
                SettingsFactory.getERPServerBaseUrl() + '/api/resource/' + documentType + '/',
                $.param({
                    data: JSON.stringify(document),
                    sid: SettingsFactory.getSid()
                })
            );
        }
    };

    return factory;
}
