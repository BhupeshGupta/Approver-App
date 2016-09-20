'use strict';

angular
  .module('ApproverApp')
  .controller('LoginController', loginController)
  .config(responseEvalConfig);


function loginController($scope, $state, SessionService, SettingsFactory) {
  console.log("Hi from Login Controller");

  $scope.login_func = function() {
    SessionService.login($scope.loginData.username, $scope.loginData.password).then(
      function(response) {
        var settings = SettingsFactory.get();
        settings.full_name = response.data.full_name;
        settings.sid = response.data.sid
        SettingsFactory.set(settings);

        console.log(JSON.stringify(SettingsFactory.get()));

        $state.go('approve.invoice.queue');
      },
      function(error) {
        console.log("Invalid Login!");
      }
    );
    console.log("Hi from Login Function");
  };

  $scope.loginData = {
    username: 'Administrator',
    password: 'admin'
  };

};



function responseEvalConfig($httpProvider) {
  var popUp = null;

  function responseEvaluator($q, $injector, $rootScope, $timeout) {

    return {
      responseError: responseError
    };

    function responseError(rejection) {
      var stat = rejection.status;
      var msg = '';

      var $ionicPopup = $injector.get('$ionicPopup');

      console.log(rejection);

      // ERP specific error extraction
      if (rejection.data && rejection.data.message)
        msg = rejection.data.message;
      else if (rejection.data && rejection.data._server_messages)
        msg = JSON.parse(rejection.data._server_messages).join('\n');

      // Generic error extraction
      else if (stat == 403) {
        var SessionService = $injector.get('SessionService');
        msg = 'Login Required';
        $timeout(function() {
          SessionService.logout();
        }, 0);
      } else if (stat == 500)
        msg = 'Internal Server Error';
      else if (stat == 501)
        msg = 'Server Error';
      else if (stat == 502)
        msg = 'Server is Offline';
      else if (stat == 503)
        msg = 'Server is Overload or down';
      else if (stat == 504)
        msg = 'Server is Offline';

      if (msg !== '')
        $ionicPopup.alert({
          title: 'Error',
          template: msg
        });

      return $q.reject(rejection);
    }

  }

  $httpProvider.interceptors.push(responseEvaluator);
}
