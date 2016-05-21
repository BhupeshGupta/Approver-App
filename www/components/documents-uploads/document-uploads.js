'use strict';

angular.module('ApproverApp')
    .controller('DocumentsUploads', documentsUploads)
    .service('getInvoiceMetaData', getInvoiceMetaData);


function documentsUploads($scope, getInvoiceMetaData, SettingsFactory, SessionService, $http) {
    $scope.getMetedata = function (meta) {
        getInvoiceMetaData.get_meta(JSON.stringify(meta)).then(
            function (data) {
                var final_data = [];
                var intermediateData = JSON.parse(data.data.message);
                for (var key in intermediateData) {
                    final_data.push({
                        "key": key,
                        "value": intermediateData[key]
                    });
                }

                $scope.metadata_list = final_data;

                pendingDocs(intermediateData['Consignment Name']);
            },
            function (error) {
                alert(error);
            });
    };


    $scope.docs = [];

    function pendingDocs(conNumber) {
        conNumber = conNumber.substring(0, conNumber.lastIndexOf("-"));
        $http.get(SettingsFactory.getReviewServerBaseUrl() + '/CurrentStat/?sid=' + SessionService.getToken() + '&where={"cno":"' + conNumber + '","status":["0","2"]}')
            .then(function (data) {

                $scope.docs.splice(0, $scope.docs.length);

                data.data.forEach(function (value, index) {
                    console.log(value.doctype);
                    $scope.docs.push({
                        label: value.doctype,
                        mandatory: true,
                        hasValue: false,
                        src: "img/icon-plus.png",
                        action: "addSelf",
                        conNumber: conNumber
                    });
                });

            });
    };


}


function getInvoiceMetaData($http, SettingsFactory) {
    this.get_meta = function (meta) {
        return $http({
            url: SettingsFactory.getERPServerBaseUrl() + '/?' + $.param({
                cmd: "flows.flows.controller.ephesoft_integration.get_meta",
                doc: meta,
                _type: 'POST',
            }),
            method: 'GET',
            cache: false
        });
    };
}
