angular.module("eahara")
    .controller("mySalesController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing', '$ionicActionSheet', '$stateParams',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing, $ionicActionSheet, $stateParams) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();
            $scope.basePath = config.basePath;

            $scope.Status = [];
            MainService.StatusInDropdown().then(function (response) {
                $scope.Status = response.data;
            }, function (err) {
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })

            $scope.Filter = {
                StatusId: 0,
            }


            $scope.Init = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                if ($stateParams.StatusId > 0) {
                    $scope.Filter = {
                        StatusId: parseInt($stateParams.StatusId),
                    }
                    $scope.Sales = [];
                    MainService.GetShopSalesById($scope.TokenInfo.ShopId, $scope.Filter.StatusId).then(function (response) {
                        $scope.Sales = response.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                    })

                } else {
                    $scope.Sales = [];
                    MainService.GetShopSalesById($scope.TokenInfo.ShopId, $scope.Filter.StatusId).then(function (response) {
                        $scope.Sales = response.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                    })
                }


            }
            $scope.Init();

            $scope.ChangeStatus = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Sales = [];
                MainService.GetShopSalesById($scope.TokenInfo.ShopId, $scope.Filter.StatusId).then(function (response) {
                    $scope.Sales = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })
            }

            $scope.SaveStatus = function (data) {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                var data = {
                    id: data.Id,
                    sid: data.StatusId,
                    Remarks: data.CancelRemarks,
                }
                MainService.UpdateBookingStatus(data).then(function (response) {
                    if (response) {
                        $scope.Init();
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $ionicLoading.hide();
                    }
                }, function () {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }

            $scope.viewDetail = function (data) {
                data.IsView = !data.IsView;
            }


            $scope.ShareLocation = function (data) {

                var tdata = "http://maps.google.com/maps?&z=7&q=" + data.Lat + "+" + data.Lng + "&ll=" + data.Lat + "+" + data.Lng;


                var message = "Delivery Location For " + data.RefNo + " click " + tdata;
                var subject = "Delivery Location EAHARA";
                var file = "";
                var link = "eahara.com";

                $cordovaSocialSharing
                    .share(message, subject, file, link)
                    .then(function (result) {
                        ionicToast.show('Success', 'bottom', false, 1500);
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    });

            }


    }]);
