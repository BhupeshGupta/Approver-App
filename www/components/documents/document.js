'use strict';

angular.module('ApproverApp')
    .controller('Documents', Documents);


function Documents(InvoiceService, SessionService, $rootScope, $scope, $q, $http, $state, RequestFactory, FileFactory, $timeout) {
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
            vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[0].id);
        } else {
            vm.selectedImg.src = '';
        }
    }



    function showImage(index) {
        vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[index].id);
    }

    function changeDocstatus(request, docstatus) {
        return $http.post('http://localhost:1337/currentstat/updatestatus', {
                qid: request.qid,
                status: docstatus,
                sid: SessionService.getToken()
            })
            .then(function () {
                var index = vm.requests.indexOf(request);
                // If the request index is last index, next index will be second last request (reverse queue)
                // Since we are going to splice last index, we need to account for array length reduction by one
                var nextRequestIndex = vm.requests.length - 1 == index ? vm.requests.length - 1 - 1 : index;
                vm.requests.splice(index, 1);
                vm.selectRequest(vm.requests[nextRequestIndex]);
            });
    }

    vm.getMetedata = function (consignmentNumber, docType) {
        var meta = {
            'type': 'Consignment Note', //docType,
            'id': consignmentNumber
        }
        InvoiceService.getMetaData(meta).then(
            function (data) {
                $scope.metadata = JSON.parse(data.data.message);
                console.log(data.data.message);
                var final_data = [];
                for (var key in $scope.metadata) {
                    final_data.push({
                        "key": key,
                        "value": $scope.metadata[key]
                    });
                }
                vm.metadata_list = final_data;
            },
            function (error) {
                alert(error);
            }
        );
    };

    $rootScope.$on("reloadRequests", function (event, data) {
        RequestFactory.getReuqests({
            status: $scope.selectedDocstatusFilter || 0
        }).then(function (requests) {
            vm.requests = requests;
        });
    });

    $rootScope.$emit("reloadRequests");

    function reloadRequestList() {
        $rootScope.$emit("reloadRequests");
    }


}
