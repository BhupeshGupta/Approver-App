'use strict';
angular.module('ApproverApp')
    .controller('Cheque', cheque);

function cheque($scope, $http) {
    var cq = this;

    cq.selectedImg = {
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

    cq.chequeImg = {
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

    cq.geturl = function (qwerty) {
        return 'http://192.168.31.195:1337/files/download/' + qwerty;
        console.log(qwerty);
    };


    cq.selectRequest = function (cheque) {
        $http.get('http://192.168.31.195:1337/Cheque/' + cheque.id)
            .then(function (data) {
                if (data.data.PayInSlip) {
                    data.data.PayInSlip.date = new Date(data.data.PayInSlip.date);
                    cq.selectedImg.src = '';
                    $http.get('http://192.168.31.195:1337/Files/?parentid=' + data.data.PayInSlip.id)
                        .then(function (payInFile) {
                            if (payInFile.data.length === 0) return;
                            cq.selectedImg.src = 'http://192.168.31.195:1337/files/download/' + payInFile.data[0].id;

                        });
                }

                data.data.chequeDate = new Date(data.data.chequeDate);
                $scope.selectedCheque = data.data;
                cq.chequeImg.src = '';
                if ($scope.selectedCheque.chequeImage && $scope.selectedCheque.chequeImage.id)
                    cq.chequeImg.src = 'http://192.168.31.195:1337/files/download/' + $scope.selectedCheque.chequeImage.id;
            });

    };


    cq.getImage = function (cheque) {
        $http.get('http://192.168.31.195:1337/Cheque/' + cheque.chequeImage)
            .then(function (data) {
                $scope.selectedCheque = data.data;

            });
    };

    // call api
    $http.get('http://192.168.31.195:1337/Cheque/')
        .then(function (data) {
            $scope.cheques = data.data;
        });

}
