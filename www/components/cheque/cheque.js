'use strict';
angular.module('ApproverApp')
    .controller('Cheque', cheque);

function cheque($scope, $http) {
    var cq = this;
    /* vars */

    function selectRequest(cheque) {
        cq.selectedCheque = cheque;
        if (cq.selectedCheque.files && cq.selectedCheque.files.length > 0) {
            cq.selectedImg.src = FileFactory.getLink(cq.selectedCheque.files[0].id);
        } else {
            cq.selectedImg.src = '';
        }
    }
    cq.getMetedata = function (cheque) {
        $http.get('http://192.168.31.195:1337/Cheque/' + cheque.id)
            .then(function (data) {
                data.data.chequeDate = new Date(data.data.chequeDate);
                if (data.data.PayInSlip)
                    data.data.PayInSlip.date = new Date(data.data.PayInSlip.date);

                $scope.selectedCheque = data.data;

            });
    };
    cq.getImage = function (cheque) {
        $http.get('http://192.168.31.195:1337/Cheque/' + cheque.chequeImage)
            .then(function (data) {
                $scope.selectedCheque = data.data;
                console.log($scope.selectedCheque);
            });
    };

    // call api
    $http.get('http://192.168.31.195:1337/Cheque/')
        .then(function (data) {
            $scope.cheques = data.data;
        });

};
