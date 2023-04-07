angular.module("eahara")
    .controller("WelcomeController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', '$cordovaDevice',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, $cordovaDevice) {


            $scope.Init = function () {

                $scope.TokenInfo = AuthenticationService.getTokenInfo();
                $scope.IsLoggedIn = false;
                if ($scope.TokenInfo != null) {
                    $scope.IsLoggedIn = true;
                    ionicToast.show('Welcome Back !', 'bottom', false, 1500);
                    $state.go("home");
                }

                $scope.Profile = {};
                $scope.ShowScreens = 1;

                //                $scope.Device = {
                //                    Platform: "",
                //                    UUId: "",
                //                    version: "",
                //                    Language: "EN"
                //                }
                //
                //                $scope.deviceInfo = {};
                //
                //                if (window.device != undefined) {
                //
                //                    $scope.Device.UUId = window.device.uuid;
                //                    $scope.Device.Platform = window.device.platform;
                //                    $scope.Device.version = window.device.version;
                //
                //                    window.FirebasePlugin.getToken(function (token) {
                //                        data.DeviceToken = token;
                //                        LoginService.sendDeviceId(data);
                //                    });
                //
                //                    window.FirebasePlugin.onTokenRefresh(function (token) {
                //                        data.DeviceToken = token;
                //                        LoginService.sendDeviceId(data);
                //                    });
                //
                //
                //                    //                    MainService.DeviceByIdUID($scope.Device.UUId).then(function (res) {
                //                    //                        if (res.data != null) {
                //                    //                            $scope.deviceInfo = res.data;
                //                    //                            $scope.ShowScreens = 1;
                //                    //                        }
                //                    //                    })
                //
                //
                //
                //                }
                //
                //                $scope.DeviceInfo = AuthenticationService.getDeviceInfo();
                //                if ($scope.DeviceInfo != null) {
                //                    $scope.ShowScreens = 1;
                //                }

            }
            $scope.Init();
            //
            //
            //            $scope.Setup = function () {
            //
            //                $scope.ShowScreens = 1;
            //
            //                $ionicLoading.show({
            //                    content: 'Loading',
            //                    animation: 'fade-in',
            //                    showBackdrop: true,
            //                    maxWidth: 200,
            //                    showDelay: 0
            //                });
            //
            //                AuthenticationService.setLangInfo($scope.Device.Language);
            //                AuthenticationService.setDeviceInfo($scope.Device);
            //
            //                MainService.AddDevice($scope.Device).then(function (response) {
            //                    if (response.data) {}
            //                    $ionicLoading.hide();
            //                }, function (err) {
            //                    $ionicLoading.hide();
            //                });
            //
            //            }


   }]);
