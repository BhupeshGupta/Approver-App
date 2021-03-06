'use strict';

angular.module('ApproverApp')
  .controller('HomeController', HomeController);


function HomeController($state, SessionService) {
  var vm = this;

  /* functions */
  vm.updateInvoiceView = updateInvoiceView;
  vm.updateChequeView = updateChequeView;
  vm.SessionService = SessionService;



  // on Document select item change value
  function updateInvoiceView(view) {
    $state.go(view == 'queue' ? 'approve.invoice.queue' : 'approve.invoice.report');
    if (view == 'queue') {
      $state.go('approve.invoice.queue');
    } else if (view == 'report') {
      $state.go('approve.invoice.report');
    } else if (view == 'uploads') {
      $state.go('approve.invoice.uploads');
    } else if (view == 'billstatus') {
      $state.go('approve.invoice.billstatus');
    }
  }

  function updateChequeView(view) {
    $state.go(view == 'queue' ? 'approve.cheque.queue' : 'approve.cheque.report');

  }

  function showImage(index) {
    vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[index].id);
  }

}
