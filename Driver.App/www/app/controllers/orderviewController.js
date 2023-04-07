angular.module("eahara")
    .controller("orderviewController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing', '$stateParams',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing, $stateParams) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();



            if ($scope.TokenInfo == null) {
                $state.go("login");
            }

            $scope.Order = {};



            if ($stateParams.OrderId != null) {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.BookingDetailsById($stateParams.OrderId).then(function (res) {

                    $scope.Order = res.data;

                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }


            $scope.MarkDelivered = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.SaveDelivredFromDriver($scope.Order.Id).then(function (res) {

                    if (res.data) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $state.go('Orders');
                    } else {
                        ionicToast.show('Failed', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }

            $scope.MarkPicked = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.SavePickedFromDriver($scope.Order.Id).then(function (res) {

                    if (res.data) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $state.go('Orders');
                    } else {
                        ionicToast.show('Failed', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }



    }]);
