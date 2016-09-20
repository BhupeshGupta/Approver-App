angular.module('ApproverApp')
  .factory('InvoiceService', invoiceService);

function invoiceService($http, SettingsFactory) {

  return {
    getMetaData: getMetaData
  }

  function getMetaData(meta) {
    
    return $http({
      url: SettingsFactory.getERPServerBaseUrl() + '/?' + $.param({
        cmd: "flows.flows.controller.ephesoft_integration.get_meta",
        doc: JSON.stringify(meta),
        _type: 'POST',
      }),
      method: 'GET',
      cache: false
    });

  }

}
