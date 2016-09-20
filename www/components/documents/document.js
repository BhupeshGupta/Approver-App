'use strict';

angular.module('ApproverApp')
  .controller('Documents', documents);


function documents(InvoiceService, SessionService, $rootScope, $scope, $q, $http, $state, QueueFactory, FileFactory, $timeout) {
  var vm = this;

  /* vars */
  vm.selectedRequest = {};
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
    fitOnload: true,
    progress: 0
  };

  init();

  function init() {
    // $on event listners are removed by angular via destructor
    // see http://stackoverflow.com/questions/26983696/angularjs-does-destroy-remove-event-listeners
    $rootScope.$on("reloadRequests", function(event, data) {
      QueueFactory.getRequests({
        status: [0, 2]
      }).then(function(requests) {
        vm.requests = requests;
      });
    });

    // Load requests on startup
    $rootScope.$emit("reloadRequests");
  }

  function selectRequest(request) {
    vm.getMetedata(request.cno, request.doctype);
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
    request.loading = true;
    var index = vm.requests.indexOf(request);
    var nextRequestIndex = vm.requests.length - 1 == index ? vm.requests.length - 1 - 1 : index;
    vm.selectRequest(vm.requests[nextRequestIndex + 1]);
    if (docstatus == 1) {
      return QueueFactory
        .updateRequestStatus(request.qid, docstatus)
        .then(function() {
          vm.requests.splice(index, 1);
        });
    } else if (docstatus == 2) {
      return QueueFactory
        .deleteRejectedRequestFromQueue(request.qid, docstatus)
        .then(function() {
          vm.requests.splice(index, 1);
        });
    }
  }

  vm.getMetedata = function(consignmentNumber, docType) {
    var meta = {
      'type': 'Consignment Note', //docType
      'id': consignmentNumber
    }
    InvoiceService.getMetaData(meta).then(
      function(data) {
        $scope.metadata = JSON.parse(data.data.message);
        console.log(data.data.message);
        var final_data = [];
        for (var key in $scope.metadata) {
          if (key[0] === '$') continue;
          final_data.push({
            "key": key,
            "value": $scope.metadata[key]
          });
        }
        vm.metadata_list = final_data;
      },
      function(error) {
        alert(error);
      }
    );
  };

  function reloadRequestList() {
    $rootScope.$emit("reloadRequests");
  }

}
