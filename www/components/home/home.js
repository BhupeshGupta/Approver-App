'use strict';

angular.module('ApproverApp')
    .controller('HomeController', HomeController);


function HomeController($rootScope, $scope, $q, $http, $state, RequestFactory, FileFactory) {
    var vm = this;

    /* vars */
    vm.selectedRequest = "";
    vm.requests = [];

    /* functions */
    vm.showImage = showImage;
    vm.selectRequest = selectRequest;
    vm.changeDocstatus = changeDocstatus;
    vm.reloadRequestList = reloadRequestList;

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
    }

    function showImage(index) {
        vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[index].fileId);
    }

    function changeDocstatus(requestId, docstatus) {
        if ([0, 2].indexOf(docstatus) > 0) {
            RequestFactory.updateStatus(requestId, docstatus, {});
        } else if (docstatus == 1) {
            $rootScope.$emit('changeDocstatus', {
                requestId: requestId,
                docstatus: docstatus
            })
        }
    }

    $rootScope.$on("reloadRequests", function (event, data) {
        RequestFactory.getReuqests({
            docstatus: $scope.selectedDocstatusFilter || 0
        }).then(function (requests) {
            vm.requests = requests;
            return vm.requests;
        });
    });

    $rootScope.$emit("reloadRequests");

    function reloadRequestList() {
        $rootScope.$emit("reloadRequests");
    }


}
