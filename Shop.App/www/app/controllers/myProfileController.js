angular.module("eahara")
    .controller("myProfileController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.Init = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Shop = {
                    Id: 0,
                    Name: "",
                    MobileNo: "",
                    TagLine: "",
                    Address: "",
                    Description: "",
                    AverageCost: "",
                    OpeningHours: "",
                    Cuisines: "",
                    Image: "",
                    DeliveryTime: "",
                    StartTime: "",
                    Lat: "",
                    Lng: "",
                    EndTime: "",
                    DeliveryRange: "",
                    Preference: "Veg & Non Veg",
                    DeliveryCharge: 0,
                }

                MainService.ShopsById($scope.TokenInfo.ShopId).then(function (res) {

                    $scope.Shop = res.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })
            }
            $scope.Init();

            $scope.SaveItem = function () {

                if ($scope.Shop.Address == "") {
                    ionicToast.show('Enter Address', 'bottom', false, 2500);
                } else if ($scope.Shop.MobileNo == "") {
                    ionicToast.show('Enter Mobile No', 'bottom', false, 2500);
                } else if ($scope.Shop.TagLine == "") {
                    ionicToast.show('Enter TagLine', 'bottom', false, 2500);
                } else if ($scope.Shop.AverageCost == "") {
                    ionicToast.show('Enter Min Order Cost', 'bottom', false, 2500);
                } else if ($scope.Shop.OpeningHours == "") {
                    ionicToast.show('Enter Opening Hours', 'bottom', false, 2500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    MainService.AddShops($scope.Shop).then(function (response) {
                        if (response) {
                            $ionicLoading.hide();
                            ionicToast.show('Success', 'bottom', false, 2500);
                            $scope.init();
                        } else {
                            $ionicLoading.hide();
                            ionicToast.show('Network Error', 'bottom', false, 2500);
                        }
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                        $ionicLoading.hide();
                    });
                }
            }




    }]);