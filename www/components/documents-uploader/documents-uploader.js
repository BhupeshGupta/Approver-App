'use strict';

angular.module('ApproverApp')
  .component('documentsUploader', {
    restrict: 'E',
    bindings: {
      doc: '='
    },
    templateUrl: '/components/documents-uploader/documents-uploader.html',
    //        template: 'Yay',
    controller: documentsUploaderController,
    controllerAs: 'duc'
  })
  .factory('DocUpload', docUpload);




function documentsUploaderController($scope, $http, SettingsFactory, SessionService, DocUpload, $q) {
  var self = this;
  self.determinateValue = 0;

  $scope.options = {
    "browseIconCls": "myBrowse",
    "removeIconCls": "myRemove",
    "captionIconCls": "myCaption",
    "unknowIconCls": "myUnknow"
  };


  $scope.$watch('files.length', function(newVal, oldVal) {
    if ($scope.files) {
      console.log($scope.files[0].lfDataUrl);
      uploadDoc(self.doc, $scope.files[0].lfFile);
    }
  });


  function uploadDoc(doc, fileBlob) {

    return DocUpload.createQueueInstance({
      cno: doc.conNumber,
      doctype: doc.label,
      sid: SessionService.getToken()
    }).then(function(data) {

      return $q(function(resolve, reject) {
        var fd = new FormData();
        fd.append('parenttype', 'Queue');
        fd.append('parentid', data.data.qid);
        fd.append('file', fileBlob, 'upload');

        var uploadUrl = SettingsFactory.getReviewServerBaseUrl() + "/files/uploadMultipart";
        var xhr = new XMLHttpRequest();
        (xhr.upload || xhr).addEventListener('progress', function(e) {
          var done = e.position || e.loaded
          var total = e.totalSize || e.total;
          console.log('xhr progress: ' + Math.round(done / total * 100) + '%');
          $scope.$apply(function() {
            self.determinateValue = Math.round(done / total * 100);
          });
        });
        xhr.addEventListener('load', function(e) {
          console.log('xhr upload complete', e, this.responseText);
          resolve(this.responseText);
        });
        xhr.open('post', uploadUrl, true);
        xhr.send(fd);

      });


      // return $http.post(uploadUrl, fd, {
      //     transformRequest: angular.identity,
      //     headers: {
      //         'Content-Type': undefined
      //     },
      //     loading: true
      // }).then(function (res) {
      //     console.log(JSON.stringify(res.data));
      // });

    });
  }

}

function docUpload($localStorage, $http, SettingsFactory) {

  return {
    createQueueInstance: createQueueInstance
  };

  function createQueueInstance(data) {
    return $http({
      url: SettingsFactory.getReviewServerBaseUrl() + "/queue",
      method: 'POST',
      data: data,
      // transformRequest: angular.identity,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }
}
