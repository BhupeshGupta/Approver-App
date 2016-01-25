'use strict';

angular.module('ApproverApp')
    .controller('HomeController', HomeController);


function HomeController($q, $http, $state) {
    var vm = this;

    /* vars */
    vm.selectedRequest = "";
    vm.requests = [];

    /* functions */
    vm.showImage = showImage;
    vm.selectRequest = selectRequest;

    vm.selectedImg = {
        src: 'http://192.168.31.124:1337/file/download/8/',
        position: {
            x: -20,
            y: -20
        },
        scaling: 2,
        maxScaling: 5,
        scaleStep: 0.11,
        mwScaleStep: 0.09,
        moveStep: 99,
        fitOnload: false,
        progress: 0
    };


    $http.get('http://192.168.31.124:1337/request').then(
        function (data) {
            angular.forEach(data.data, function (r, index) {
                r.data = JSON.parse(JSON.parse(r.uploadedData).body.data);
            });
            vm.requests = data.data;
        });

    function selectRequest(request) {
        vm.selectedRequest = request;

        if (vm.selectedRequest.files && vm.selectedRequest.files.lenght > 0) {
            vm.selectedImg.src = "http://192.168.31.124:1337/file/download/" +
                vm.selectedRequest.files[0].fileId +
                "/";
        } else {
            vm.selectedImg.src = '';
        }

        $state.go('approve.cheque.edit');
        //        chequeFlowController.set_user_input(request);
    }

    function showImage(index) {
        vm.selectedImg.src = "http://192.168.31.124:1337/file/download/" +
            vm.selectedRequest.files[index].fileId +
            "/";
    }
}
