'use strict';

angular.module('ApproverApp')
    .controller('HomeController', HomeController);


function HomeController($q, $http, $state, RequestFactory, FileFactory) {
    var vm = this;

    /* vars */
    vm.selectedRequest = "";
    vm.requests = [];

    /* functions */
    vm.showImage = showImage;
    vm.selectRequest = selectRequest;

    vm.selectedImg = {
        src: '',
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

    RequestFactory.getReuqests().then(function (requests) {
        vm.requests = requests;
        return vm.requests;
    });

    function selectRequest(request) {
        vm.selectedRequest = request;

        if (vm.selectedRequest.files && vm.selectedRequest.files.length > 0) {
            vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[0].fileId);
        } else {
            vm.selectedImg.src = '';
        }

        $state.go('approve.cheque.edit', {
            requestId: request.requestId
        });
        //        chequeFlowController.set_user_input(request);
    }

    function showImage(index) {
        vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[index].fileId);
    }
}
