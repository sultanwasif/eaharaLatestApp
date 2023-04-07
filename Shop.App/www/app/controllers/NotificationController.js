angular.module("eahara")
    .controller("NotificationController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', 'MainService',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, MainService) {


            $scope.Init = function () {


                $scope.Notifications = [];
                $scope.TokenInfo = AuthenticationService.getTokenInfo();
                MainService.GetUserNotifications($scope.TokenInfo.UserId).then(function (res) {
                    $scope.Notifications = res.data;
                })
                MainService.resetUserNotifications($scope.TokenInfo.UserId).then(function (res) {
                    $scope.isnotificlear = res.data;
                })


            }
            $scope.Init();

        }]);