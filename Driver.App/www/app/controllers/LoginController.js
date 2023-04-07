angular.module("eahara")
    .controller("LoginController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', 'MainService',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, MainService) {


            $scope.ShowError = false;
            $scope.showLoad = false;

            $scope.User = {
                UserName: "",
                Password: ""
            }

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            if ($scope.TokenInfo != null) {
                $state.go("home");
            }

            $scope.login = function () {

                $scope.ShowError = false;

                if ($scope.User.UserName == null || $scope.User.UserName == "" || $scope.User.UserName == undefined) {
                    ionicToast.show('Enter Username', 'bottom', false, 2500);
                } else if ($scope.User.Password == null || $scope.User.Password == "" || $scope.User.Password == undefined) {
                    ionicToast.show('Enter Password', 'bottom', false, 2500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    LoginService.login($scope.User).then(function (response) {
                        if (response.data != null) {
                            $scope.TokenInfo = response.data;

                            if ($scope.TokenInfo.Role == 'Employee' || $scope.TokenInfo.Role == 'Employee') {
                                AuthenticationService.setTokenInfo($scope.TokenInfo);
                                $scope.showLoad = false;
                                $state.go("home");
                                $ionicLoading.hide();
                                //$scope.InitTab();
                            } else {
                                ionicToast.show('Username not registered', 'bottom', false, 2500);
                                $ionicLoading.hide();
                            }
                        } else {
                            $scope.User = {};
                            $scope.showLoad = false;
                            $scope.ShowError = true;
                            $ionicLoading.hide();
                            ionicToast.show('Username not registered', 'bottom', false, 2500);
                        }
                    }, function (err) {
                        $scope.showLoad = false;
                        $scope.ShowError = true;
                        $ionicLoading.hide();
                        ionicToast.show('Incorrect password', 'bottom', false, 2500);
                    });
                }
            };



        }]);
