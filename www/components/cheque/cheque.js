'use strict';

angular.module('ApproverApp')
    .controller('chequeFlowController', function ($rootScope, $scope, $state, $q, $http, $stateParams, RequestFactory, DocumentService) {

        console.log($stateParams);

        RequestFactory.getRequest($stateParams.requestId).then(function (request) {
            console.log(request);
            $scope.user_input = prepareForView(request.data);
        });

        console.log("Hi from Cheque Controller");



        $scope.company_search = function (query) {
            var promise = $q.defer();
            DocumentService.search('Company', query, {}).success(function (data) {
                promise.resolve(data.results);
            });
            return promise.promise;
        };

        $scope.account_search = function (query) {
            var promise = $q.defer();
            DocumentService.search('Account', query, {
                company: $scope.user_input.company[0].value
            }).success(function (data) {
                promise.resolve(data.results);
            });
            return promise.promise;
        };

        $scope.createVoucher = function () {
            $scope.user_input.entries[1].credit = $scope.user_input.entries[0].debit;

            DocumentService.create('Journal Voucher', $scope.user_input).then(
                function (success) {
                    console.log(success);
                });
        };

        function prepareForErp(data) {
            // Create a deep copy
            var transformed_data = JSON.parse(JSON.stringify(data));
            transformed_data.company = transformed_data.company[0].value;
            transformed_data.entries[0].account = transformed_data.entries[0].account[0].value;
            transformed_data.entries[1].account = transformed_data.entries[1].account[0].value;
            transformed_data.cheque_date = moment(transformed_data.cheque_date).format("YYYY-MM-DD");
            transformed_data.posting_date = moment(transformed_data.posting_date).format("YYYY-MM-DD");
            return transformed_data
        }

        function prepareForView(data) {
            var transformed_data = JSON.parse(JSON.stringify(data));
            transformed_data.cheque_date = moment(transformed_data.cheque_date).toDate();
            transformed_data.posting_date = moment(transformed_data.posting_date).toDate();
            transformed_data.entries[1].account = [{
                value: transformed_data.entries[1].account
            }];
            transformed_data.entries[0].account = [{
                value: transformed_data.entries[0].account
            }];
            transformed_data.company = [{
                value: transformed_data.company
            }];
            return transformed_data
        }

        $rootScope.$on("changeDocstatus", function handleDocstatusChange(event, args) {
            console.log(args);
            RequestFactory.updateStatus(args.requestId, args.docstatus, prepareForErp($scope.user_input));
        });

    });
