'use strict';

angular.module('ApproverApp')
    .controller('chequeFlowController', function ($scope, $state, $q, $http) {

        this.set_user_input = function (input) {
            $scope.user_input = input;
        }

        console.log("Hi from Cheque Controller");
        //DocumentService


        $scope.company_search = function (query) {
            var promise = $q.defer();
            DocumentService.search('Company', query, {}).success(function (data) {
                promise.resolve(data.results);
            });
            return promise.promise;
        }

        $scope.account_search = function (query) {
            var promise = $q.defer();
            DocumentService.search('Account', query, {
                company: $scope.user_input.company[0].value
            }).success(function (data) {
                promise.resolve(data.results);
            });
            return promise.promise;
        }

        $scope.createVoucher = function () {
            $scope.user_input.entries[1].credit = $scope.user_input.entries[0].debit
            DocumentService.create('Journal Voucher', $scope.user_input).then(
                function (success) {
                    console.log(success);
                });
        };

    });
