angular.module("eahara")
    .controller("homeController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();



            if ($scope.TokenInfo == null) {
                $state.go("login");
            }

            $scope.DashBoardCounts = {};

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            MainService.DriverDashBoardCounts($scope.TokenInfo.EmployeeId).then(function (res) {

                $scope.DashBoardCounts = res.data;

                $ionicLoading.hide();
            }, function (err) {
                $ionicLoading.hide();
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })

            MainService.MEDDriverDashBoardCounts($scope.TokenInfo.EmployeeId).then(function (res) {

                $scope.MEDDashBoardCounts = res.data;

                $ionicLoading.hide();
            }, function (err) {
                $ionicLoading.hide();
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })




            $scope.goSalesApproved = function () {
                angular.forEach($scope.Status, function (e) {
                    if (e.Name == "Approved") {

                        $state.go('mySales', {
                            StatusId: e.Id
                        });
                    }
                });

            }



    }]);
