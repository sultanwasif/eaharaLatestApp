angular.module("eahara")
    .controller("settingsController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', 'MainService', '$cordovaDevice', '$cordovaSocialSharing', '$cordovaClipboard',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, MainService, $cordovaDevice, $cordovaSocialSharing, $cordovaClipboard) {


            $scope.Init = function () {

                $scope.TokenInfo = AuthenticationService.getTokenInfo();

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });


                $scope.Profile = {};
                MainService.CustomerById($scope.TokenInfo.CustomerId).then(function (res) {
                    $scope.Profile = res.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                });

                $scope.company = {};
                MainService.GetCompanyProfile().then(function (res) {
                    $scope.company = res.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                });

            }
            $scope.Init();



            $scope.ReferAFriend = function () {

                var message = $scope.company.ShareText;
                message = message + " Use This Code While Registering : " + $scope.Profile.RefNo;
                var subject = $scope.company.ShareSubject;
                var file = "";
                var link = $scope.company.Website;

                $cordovaSocialSharing
                    .share(message, subject, file, link)
                    .then(function (result) {
                        ionicToast.show('Success', 'bottom', false, 1500);
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    });
            }


            $scope.Copy = function () {
                $cordovaClipboard
                    .copy($scope.Profile.RefNo)
                    .then(function () {
                        ionicToast.show('Code copied to clipboard', 'bottom', false, 1500);
                    }, function () {
                        ionicToast.show('Error Copy', 'bottom', false, 1500);
                    });
            }


                }]);