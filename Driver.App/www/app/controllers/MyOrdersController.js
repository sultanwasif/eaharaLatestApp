angular.module("eahara")
    .controller("MyOrdersController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing', '$stateParams',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing, $stateParams) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();



            if ($scope.TokenInfo == null) {
                $state.go("login");
            }

            $scope.Orders = [];

            $scope.init = function () {
                $scope.data = {
                    Date: new Date(),
                    EmployeeId: $scope.TokenInfo.EmployeeId,
                }
            }
            $scope.init();


            $scope.getData = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0,
                });

                MainService.getDriverOrdersUnDelivrerdByDay($scope.data).then(function (res) {

                    $scope.Orders = res.data;
                    $ionicLoading.hide();

                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }
            $scope.getData();



    }]);
