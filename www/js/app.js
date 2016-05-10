// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ApproverApp', [
    'ionic',
    'ngPintura',
    'ion-autocomplete',
    'ngStorage'
])

.value('ServerUrl', 'http://192.168.31.195:1337')
    .value('ERP', 'http://erp.arungas.com')

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.run(function ($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
})

.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('approve', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'hc'
                }
            }
        })
        .state('approve.cheque', {
            url: 'cheque/',
            views: {
                'form_view': {
                    templateUrl: 'components/cheque/cheque.html',
                    controller: 'chequeFlowController'
                }
            }
        })
        .state('approve.cheque.edit', {
            url: 'edit/',
            views: {
                'cheque_view': {
                    templateUrl: 'components/cheque/forms/cheque_detail.html'
                }
            }
        })
        .state('approve.invoice', {
            url: 'invoice/',
            abstract: true,
            'views': {
                form_view: {
                    template: '<ion-nav-view name="invoice_view"></ion-nav-view>'
                }
            }
        })
        .state('approve.invoice.report', {
            url: 'report/',
            views: {
                'invoice_view': {
                    templateUrl: 'components/invoice-report/invoice-report.html',
                    controller: 'InvoiceReport'
                }
            }
        })
        .state('approve.invoice.queue', {
            url: 'queue/',
            views: {
                'invoice_view': {
                    templateUrl: 'components/documents/document.html',
                    // controller: 'chequeFlowController'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                '': {
                    'templateUrl': 'components/login/login.html',
                    controller: 'LoginController'
                }
            }


        });
});
