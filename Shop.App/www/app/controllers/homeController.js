angular.module("eahara")
    .controller("homeController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.Status = [];
            MainService.StatusInDropdown().then(function (response) {
                $scope.Status = response.data;
            }, function (err) {
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })

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

            MainService.DashBoardCounts($scope.TokenInfo.ShopId).then(function (res) {

                $scope.DashBoardCounts = res.data;

                $ionicLoading.hide();
            }, function (err) {
                $ionicLoading.hide();
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })

            $scope.goSalesBooked = function () {
                angular.forEach($scope.Status, function (e) {
                    if (e.Name == "Booked") {

                        $state.go('mySales', {
                            StatusId: e.Id
                        });
                    }
                });

            }

            $scope.goSalesApproved = function () {
                angular.forEach($scope.Status, function (e) {
                    if (e.Name == "Approved") {

                        $state.go('mySales', {
                            StatusId: e.Id
                        });
                    }
                });

            }

            $scope.goSalesPacked = function () {
                angular.forEach($scope.Status, function (e) {
                    if (e.Name == "Packed") {

                        $state.go('mySales', {
                            StatusId: e.Id
                        });
                    }
                });

            }

            $scope.goSalesCancelled = function () {
                angular.forEach($scope.Status, function (e) {
                    if (e.Name == "Cancelled") {

                        $state.go('mySales', {
                            StatusId: e.Id
                        });
                    }
                });

            }

            $scope.goSalesDelivered = function () {

                angular.forEach($scope.Status, function (e) {
                    if (e.Name == "Delivered") {

                        $state.go('mySales', {
                            StatusId: e.Id
                        });
                    }
                });

            }

            $scope.goSales = function (id) {
                $state.go('mySales', {
                    StatusId: 0
                });
            }


    }]);
