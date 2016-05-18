angular
  .module('ApproverApp')
  .factory('QueueFactory', queueFactory);

queueFactory.$inject = ['$http', 'ServerUrl', 'SettingsFactory'];

function queueFactory($http, ServerUrl, SettingsFactory, SessionService) {
  return {
    getRequests: getRequests,
    updateRequestStatus: updateRequestStatus
  };

  function getRequests(query) {

    return $http.get(SettingsFactory.getReviewServerBaseUrl() + '/queue?' + $.param(query)).then(
      function(res) {
        angular.forEach(res.data, function(r) {
          $http.get(SettingsFactory.getReviewServerBaseUrl() + '/files/?parentid=' + r.qid)
            .then(function(response) {
              r.files = response.data;
            })
        });
        return res.data;
      });

  }

  function updateRequestStatus(queueId, status) {

    return $http.post(SettingsFactory.getReviewServerBaseUrl() + '/currentstat/updatestatus', {
      qid: request.qid,
      status: docstatus,
      sid: SessionService.getToken()
    });

  }

}
