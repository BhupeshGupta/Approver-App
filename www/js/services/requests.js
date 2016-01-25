angular
    .module('ApproverApp')
    .factory('RequestFactory', RequestFactory);

RequestFactory.$inject = ['$http', 'ServerUrl'];

function RequestFactory($http, ServerUrl) {
    return {
        getReuqests: getReuqests,
        getRequest: getRequest
    };

    function getReuqests() {
        return $http.get(ServerUrl + 'request').then(
            function (data) {
                angular.forEach(data.data, function (r) {
                    r.data = JSON.parse(JSON.parse(r.uploadedData).body.data);
                });
                return data.data;
            });
    }

    function getRequest(requestId) {
        return $http.get(ServerUrl + 'request/' + requestId + '/').then(
            function (data) {
                data.data.data = JSON.parse(JSON.parse(data.data.uploadedData).body.data);
                return data.data;
            });
    }
}
