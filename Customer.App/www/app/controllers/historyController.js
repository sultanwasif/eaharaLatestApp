angular.module("eahara")
    .controller("historyController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicActionSheet', 'MainService', '$cordovaSocialSharing', "$cordovaGeolocation",
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicActionSheet, MainService, $cordovaSocialSharing, $cordovaGeolocation) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();
            $scope.basePath = config.basePath;

            $scope.Init = function () {


                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Orders = [];
                MainService.MyOrdersInApp($scope.TokenInfo.CustomerId).then(function (response) {
                    $scope.Orders = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                });

            }
            $scope.Init();

            $scope.CancelItem = function (data) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                data.id = data.Id;
                MainService.CancelBooking(data).then(function (response) {
                    if (response) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $scope.Orders = [];
                        MainService.MyOrdersInApp($scope.TokenInfo.CustomerId).then(function (response) {
                            $scope.Orders = response.data;
                            $ionicLoading.hide();
                        }, function (err) {
                            $ionicLoading.hide();
                            ionicToast.show('Network Error', 'bottom', false, 2500);
                        });
                        $ionicLoading.hide();
                    }
                }, function () {
                    $ionicLoading.hide();
                    toastr.error("Network Error");
                })
            }


    }]);
