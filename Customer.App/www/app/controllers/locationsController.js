angular.module("eahara")
    .controller("locationsController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$stateParams', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $stateParams, MainService, $cordovaSocialSharing) {

            $scope.init = function () {


                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.search = {
                    Name: "",
                }

                $scope.Locations = [];
                MainService.LocationInDropdown().then(function (response) {
                    $scope.Locations = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });

            }
            $scope.init();

            $scope.Clear = function () {

                $scope.search = {
                    Name: "",
                }
            }


    }]);
