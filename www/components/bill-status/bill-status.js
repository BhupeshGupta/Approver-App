'use strict';

angular.module('ApproverApp')
    .controller('BillStatus', billStatus);


function billStatus($scope, getInvoiceMetaData, $http, SettingsFactory, SessionService) {


    $scope.searchConsignmentNote = searchConsignmentNote;



    function searchConsignmentNote(cnNumber) {

        getInvoiceMetaData.get_meta(JSON.stringify({
            type: 'Consignment Note',
            id: cnNumber
        })).then(
            function (data) {
                var intermediateData = JSON.parse(data.data.message);
                $scope.metadata = intermediateData;
                loadCurrentStatus(intermediateData['Consignment Name']);
            },
            function (error) {
                alert(error);
            });

    }

    function loadCurrentStatus(conNumber) {
        conNumber = conNumber.substring(0, conNumber.lastIndexOf("-"));
        $http.get(SettingsFactory.getReviewServerBaseUrl() + '/CurrentStat/?sid=' + SessionService.getToken() + '&where=' + JSON.stringify({
                cno: conNumber
            }))
            .then(function (data) {
                $scope.docs = data.data;

                var doctypes = [];
                data.data.forEach(function (value) {
                    doctypes.push(value.doctype);
                });

                loadTimeline(conNumber, doctypes);
            });
    }

    function loadTimeline(cno, doctypes) {
        doctypes.forEach(function (doctype) {
            $scope.auditTrail = {};
            $http.get(SettingsFactory.getReviewServerBaseUrl() + '/AuditTrail/?sid=' + SessionService.getToken() + '&limit=1000&sort=id desc' + '&where=' + JSON.stringify({
                    doctype: doctype,
                    cno: cno
                }))
                .then(function (data) {
                    $scope.auditTrail[doctype] = data.data;
                });

        });
    }



}
