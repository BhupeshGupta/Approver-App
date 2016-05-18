'use strict';

angular.module('ApproverApp')
  .controller('HomeController', HomeController);


function HomeController($state) {
  var vm = this;

  /* functions */
  vm.updateInvoiceView = updateInvoiceView;
  vm.updateChequeView = updateChequeView;


  // on Document select item change value
  function updateInvoiceView(view) {
    $state.go(view == 'queue' ? 'approve.invoice.queue' : 'approve.invoice.report');
    if (view == 'queue') {
      $state.go('approve.invoice.queue');
    } else if (view == 'report') {
      $state.go('approve.invoice.report');
    } else if (view == 'uploads') {
      $state.go('approve.invoice.uploads');
    }
  }

  function updateChequeView(view) {
    $state.go(view == 'queue' ? 'approve.cheque.queue' : 'approve.cheque.report');

  }

  function showImage(index) {
    vm.selectedImg.src = FileFactory.getLink(vm.selectedRequest.files[index].id);
  }

}
