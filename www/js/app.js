angular.module('ApproverApp', [
  'ionic',
  'ngPintura',
  'ion-autocomplete',
  'ngStorage',
  'nvd3',
  'ionic-datepicker',
  'ngMaterial',
  'ngAria',
  'lfNgMdFileInput',
])

.value('ServerUrl', 'http://192.168.31.195:1337')
    .value('ERP', 'http://192.168.31.195:8080')

.run(function ($rootScope, $timeout, $state) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
    $rootScope.$on('user:logout', function () {
        $timeout(function () {
            $state.go('login');
        }, 0);
    });
})

.run(function ($ionicPlatform, $ionicConfig) {
    $ionicPlatform.ready(function () {
        $ionicConfig.views.transition('none');
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                '': {
                    'templateUrl': 'components/login/login.html',
                    controller: 'LoginController'
                }
            },
            resolve: {
                "session": function (SessionService, $state, $timeout) {
                    if (SessionService.isLoggedIn()) {
                        $timeout(function () {
                            $state.go('approve.invoice.queue');
                        }, 0);
                    }
                }
            }
        })

    .state('approve', {
        url: '/',
        views: {
            '': {
                templateUrl: 'components/home/home.html',
                controller: 'HomeController',
                controllerAs: 'hc'
            }
        },
        // resolve: {
        //   "session": function(SessionService, $state, $timeout) {
        //     SessionService.setupUser();
        //   }
        // }
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
        .state('approve.invoice.queue', {
            url: 'queue/',
            views: {
                'invoice_view': {
                    templateUrl: 'components/documents/document.html',
                    controller: 'Documents',
                    controllerAs: 'dc'
                }
            }
        })
        .state('approve.invoice.report', {
            url: 'report/',
            views: {
                'invoice_view': {
                    templateUrl: 'components/invoice-report/invoice-report.html',
                    controller: 'InvoiceReport',
                    controllerAs: 'irc'
                }
            }
        })
        .state('approve.invoice.uploads', {
            url: 'uploads/',
            views: {
                'invoice_view': {
                    templateUrl: 'components/documents-uploads/document-uploads.html',
                    controller: 'DocumentsUploads'
                }
            }
        })
        .state('approve.invoice.progressbar', {
            url: 'progressbar/',
            views: {
                'invoice_view': {
                    templateUrl: 'components/progressbar/progressbar.html',
                    controller: 'progressbar'
                }
            }
        })
        .state('approve.cheque', {
            url: 'cheque/',
            abstract: true,
            'views': {
                form_view: {
                    template: '<ion-nav-view name="cheque"></ion-nav-view>'
                }
            }
        })
        .state('approve.cheque.queue', {
            url: 'queue/',
            views: {
                'cheque': {
                    templateUrl: 'components/cheque/cheque.html',
                    controller: 'Cheque',
                    controllerAs: 'cq'
                }
            }
        })

    .state('approve.cheque.report', {
        url: 'report/',
        views: {
            'cheque': {
                templateUrl: 'components/cheque-report/cheque-report.html',
                controller: 'ChequeReport'
            }
        }
    });
});
