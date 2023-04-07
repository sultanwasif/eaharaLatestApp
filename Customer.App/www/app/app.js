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
    })


    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $urlRouterProvider.otherwise('welcome');


        $ionicConfigProvider.tabs.position('bottom');
        $stateProvider


            .state('welcome', {
                url: '/welcome',
                templateUrl: 'Templates/welcome.html',
                controller: "WelcomeController"
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
                        controller: "DashboardController"
                    }
                }
            })

            .state('login', {
                parent: "tab",
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/login.html',
                        controller: "LoginController"
                    }
                }
            })

            .state('locations', {
                parent: "tab",
                url: '/locations',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/locations.html',
                        controller: "locationsController"
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

            .state('register', {
                parent: "tab",
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/register.html',
                        controller: "registerController"
                    }
                }
            })

            .state('TroubleLogin', {
                parent: "tab",
                url: '/TroubleLogin',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/TroubleLogin.html',
                        controller: "TroubleLoginController"
                    }
                }
            })

            .state('track', {
                parent: "tab",
                url: '/track',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/track.html',
                    }
                }
            })

            .state('offers', {
                parent: "tab",
                url: '/offers',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/offers.html',
                        controller: "OfferController"
                    }
                }
            })

            .state('enquiry', {
                parent: "tab",
                url: '/enquiry',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/enquiry.html',
                    }
                }
            })

            //        .state('scrachPage', {
            //            parent: "tab",
            //            url: '/scrachPage',
            //            views: {
            //                'menuContent': {
            //                    templateUrl: 'Templates/scrachPage.html',
            //                    controller: "scrachPageController"
            //                }
            //            }
            //        })

            .state('shopByLocation', {
                parent: "tab",
                url: '/shopByLocation',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/shopByLocation.html',
                        controller: "shopByLocationController"
                    }
                }
            })

            .state('cart', {
                parent: "tab",
                url: '/cart',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/cart.html',
                        controller: "cartController"
                    }
                }
            })


            ///////////  settings /////////////    

            .state('userSettings', {
                parent: "tab",
                url: '/userSettings',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/userSettings.html',
                        controller: "settingsController"
                    }
                }
            })

            .state('changePassword', {
                parent: "tab",
                url: '/changePassword',
                views: {
                    'menuContent@tab': {
                        templateUrl: 'Templates/changePassword.html',
                    }
                }
            })

            //////////////// items ///////////

            .state('itemsBycategory', {
                parent: "tab",
                url: '/itemsBycategory/:CatId',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/itemsBycategory.html',
                        controller: "itemsBycategoryController"
                    }
                }
            })

            .state('items', {
                parent: "tab",
                url: '/items',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/items.html',
                        controller: "itemsController"
                    }
                }
            })

            .state('history', {
                parent: "tab",
                url: '/history',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/history.html',
                        controller: "historyController"
                    }
                }
            })

            .state('profile', {
                parent: "tab",
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/profile.html',
                        controller: "profileController"
                    }
                }
            })

            .state('itemsDetail', {
                parent: "tab",
                params: {
                    obj: null
                },
                url: '/itemsDetail/:ItemId',
                views: {
                    'menuContent@tab': {
                        templateUrl: 'Templates/itemsDetail.html',
                        controller: "itemsDetailController"
                    }
                }
            })

            //////////////// restaurants ///////////

            .state('restaurants', {
                parent: "tab",
                url: '/restaurants',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/restaurants.html',
                        controller: "restaurantsController"
                    }
                }
            })

            .state('restaurantDetail', {
                parent: "tab",
                params: {
                    obj: null
                },
                url: '/restaurantDetail/:RestaurantId',
                views: {
                    'menuContent@tab': {
                        templateUrl: 'Templates/restaurantDetail.html',
                        controller: "restaurantDetailController"
                    }
                }
            })

            .state('checkout', {
                parent: "tab",
                url: '/checkout',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/checkout.html',
                        controller: "checkoutController"
                    }
                }
            })

            .state('search', {
                parent: "tab",
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/search.html',
                        controller: "searchController"
                    }
                }
            })


            .state('offerItems', {
                parent: "tab",
                params: {
                    obj: null
                },
                url: '/offerItems/:OfferId',
                views: {
                    'menuContent@tab': {
                        templateUrl: 'Templates/offerItems.html',
                        controller: "offerItemsController"
                    }
                }
            })


            .state('Terms', {
                parent: "tab",
                url: '/Terms',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Terms.html',

                    }
                }
            })

    })
    .config(['$httpProvider', '$compileProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptor");
}])
