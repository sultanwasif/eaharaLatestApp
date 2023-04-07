var db = null;
angular.module('eahara', ['ionic', 'ngCordova', 'ionic-toast', 'jkAngularRatingStars'])
    .value('app.config', {

        // basePath: 'http://localhost:52426/'
        basePath: 'http://eahara.ainsoftsolutions.com/'

    })

    .run(function ($ionicPlatform, $cordovaNetwork, $rootScope, ionicToast, NetWorkDataService) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            var networkType = $cordovaNetwork.getNetwork();
            var connectionStatus = $cordovaNetwork.isOnline();
            if (connectionStatus == false) {
                ionicToast.show('No Internet Acces Check Your Netconnection', 'bottom', true, 2500);
            } else {
                ionicToast.show(' Now You are Online ', 'bottom', false, 2500);
            }
            NetWorkDataService.setNetworkStatus(connectionStatus);
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                NetWorkDataService.setNetworkStatus(true);
                ionicToast.show('Now You are Online ', 'bottom', false, 2500);
                console.log("got onine");
            })
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                console.log("got offline");
                NetWorkDataService.setNetworkStatus(false);
                ionicToast.show('No Internet Acees Check Your Netconnection', 'bottom', false, 2500);
            })

        });
        $ionicPlatform.registerBackButtonAction(function (e) {
            if ($state.current.name != "home") {
                $rootScope.backButtonPressedOnceToExit = false;
            }
            if ($rootScope.backButtonPressedOnceToExit == true) {
                ionic.Platform.exitApp();
            } else {
                $state.go("home");
                $rootScope.backButtonPressedOnceToExit = true;
                ionicToast.show('Press back button again to exit', 'bottom', false, 2500);
            }
            e.preventDefault();
            return false;
        }, 101);
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $urlRouterProvider.otherwise('login');


        $ionicConfigProvider.tabs.position('bottom');
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'Templates/login.html',
                controller: "LoginController"
            })

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'Templates/tabs.html',
                controller: "TabController"
            })

            ////////////////////// home /////////////

            .state('home', {
                parent: "tab",
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/home.html',
                        controller: "homeController"
                    }
                }
            })

            .state('notifications', {
                parent: "tab",
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/notifications.html',
                        controller: "NotificationController"
                    }
                }
            })

            .state('changepassword', {
                parent: "tab",
                url: '/changepassword',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/changePassword.html',
                    }
                }
            })


            .state('orderview', {
                parent: "tab",
                url: '/orderview/:OrderId',
                params: {
                    obj: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/orderview.html',
                        controller: "orderviewController"
                    }
                }
            })

            .state('Orders', {
                parent: "tab",
                url: '/Orders',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Orders.html',
                        controller: "OrdersController"
                    }
                }
            })

            .state('MyOrders', {
                parent: "tab",
                url: '/MyOrders',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/MyOrders.html',
                        controller: "MyOrdersController"
                    }
                }
            })

            .state('HFOrderview', {
                parent: "tab",
                url: '/HFOrderview/:OrderId',
                params: {
                    obj: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/HFOrderview.html',
                        controller: "HFOrderviewController"
                    }
                }
            })

            .state('HFOrders', {
                parent: "tab",
                url: '/HFOrders',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/HFOrders.html',
                        controller: "HFOrdersController"
                    }
                }
            })

            .state('HFMyOrders', {
                parent: "tab",
                url: '/HFMyOrders',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/HFMyOrders.html',
                        controller: "HFMyOrdersController"
                    }
                }
            })


    })
    .config(['$httpProvider', '$compileProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptor");
}])
