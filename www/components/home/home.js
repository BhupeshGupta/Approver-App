'use strict';

approverApp.controller('HomeController', function ($scope, $q, $http, $state) {
    var request_promise = $q.defer();
    $http.get('http://192.168.31.124:1337/request').then(
        function (data) {
            angular.forEach(data.data, function (r, index) {
                r.data = JSON.parse(JSON.parse(r.uploadedData).body.data);
            });
            
            $scope.requests = data.data;
            console.log(data.data);
            request_promise.resolve(data.data);
        });
    
    $scope.selectRequest = function (request) {
        $scope.selectedRequest = request;
        if ($scope.selectedRequest.files)
            $scope.selectedRequest.selectedImg = $scope.selectedRequest.files[0];
        $state.go('approve.cheque.edit');
        chequeFlowController.set_user_input(request);
    }
    
    $scope.showImage = function (index) {
        $scope.selectedRequest.selectedImg = $scope.selectedRequest.files[index];
    }

    
});
