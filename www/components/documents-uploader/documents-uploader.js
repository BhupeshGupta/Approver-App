'use strict';

angular.module('ApproverApp')
    .component('documentsUploader', {
        restrict: 'E',
        bindings: {
            onCreation: '='
        },
        templateUrl: '/components/documents-uploader/documents-uploader.html',
        //        template: 'Yay',
        controller: documentsUploaderController,
        controllerAs: 'duc'
    });


function documentsUploaderController($scope, $interval) {
    var self = this;
    self.determinateValue = 30;

//    $scope.$watch('files02.length', function (newVal, oldVal) {
//        console.log($scope.files02);
//    });
    $scope.optoin08 = {
        "browseIconCls": "myBrowse",
        "removeIconCls": "myRemove",
        "captionIconCls": "myCaption",
        "unknowIconCls": "myUnknow"
    }
}
