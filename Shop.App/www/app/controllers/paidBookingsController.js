angular.module("eahara")
    .controller("paidBookingsController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicActionSheet', 'MainService', '$cordovaSocialSharing', "$cordovaGeolocation",
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicActionSheet, MainService, $cordovaSocialSharing, $cordovaGeolocation) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();
            $scope.basePath = config.basePath;

            $scope.Init = function () {

                $scope.filter = {

                    FromDate: new Date(),
                    ToDate: new Date(),
                    ShopId: $scope.TokenInfo.ShopId,
                    Paid: "Paid",
                }

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Bookings = [];
                MainService.BookingReportsShop($scope.filter).then(function (response) {
                    $scope.Bookings = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                });

            }
            $scope.Init();

            $scope.GetReport = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Bookings = [];
                MainService.BookingReportsShop($scope.filter).then(function (response) {
                    $scope.Bookings = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                });

            }


            $scope.viewDetail = function (data) {
                data.IsView = !data.IsView;
            }


    }]);
