angular.module("eahara")
    .controller("OrdersController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            if ($scope.TokenInfo == null) {
                $state.go("login");
            }

            $scope.Init = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Orders = [];
                MainService.getDriverOrdersUnDelivrerd($scope.TokenInfo.EmployeeId).then(function (res) {
                    $scope.Orders = res.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })
            }
            $scope.Init();

            $scope.MarkDelivered = function (data) {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.SaveDelivredFromDriver(data.Id).then(function (res) {

                    if (res.data) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $scope.Init();
                    } else {
                        ionicToast.show('Failed', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }

            $scope.MarkPicked = function (data) {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.SavePickedFromDriver(data.Id).then(function (res) {

                    if (res.data) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $scope.Init();
                    } else {
                        ionicToast.show('Failed', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }




            $scope.godetails = function (e) {
                $state.go('orderview', {
                    OrderId: e.Id
                });

            }



    }]);
