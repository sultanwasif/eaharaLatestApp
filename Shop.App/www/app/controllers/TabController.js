angular.module("eahara")
    .controller("TabController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing) {

            $scope.basepath = config.basePath;

            $scope.setLanguage = function (data) {
                $scope.LanInfo = AuthenticationService.setLanInfo(data);
                $scope.InitLan();
            }

            $scope.InitTab = function () {
                $scope.TokenInfo = AuthenticationService.getTokenInfo();
                $scope.IsLoggedIn = false;
                if ($scope.TokenInfo != null) {
                    $scope.IsLoggedIn = true;
                    console.log($scope.TokenInfo);
                } else {
                    $state.go("login");
                }

            }
            $scope.InitTab();


            $scope.NotifiCount = 0;
            setInterval(function () {
                $scope.TokenInfo = AuthenticationService.getTokenInfo();
                if ($scope.TokenInfo != null) {
                    MainService.getNotiCaount($scope.TokenInfo.UserId).then(function (res) {
                        $scope.NotifiCount = res.data;
                    })
                }
            }, 10000);


            $scope.TenantMenu = 0;
            $scope.SetTenantMenu = function () {
                if ($scope.TenantMenu == 0) {
                    $scope.TenantMenu = 1;
                } else {
                    $scope.TenantMenu = 0;
                }
            }

            $scope.ReportMenu = 0;
            $scope.SetReportMenu = function () {
                if ($scope.ReportMenu == 0) {
                    $scope.ReportMenu = 1;
                } else {
                    $scope.ReportMenu = 0;
                }
            }

            $scope.ShowError = false;
            $scope.showLoad = false;

            $scope.logOut = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                var tokenInfo = AuthenticationService.getTokenInfo();
                var data = tokenInfo;
                LoginService.logOut(tokenInfo).then(function (res) {
                    AuthenticationService.removeTokenInfo();
                    $scope.logInfo = {};
                    $state.go("login").then(function (response) {
                        $ionicHistory.clearHistory();
                        $ionicHistory.clearCache();
                        tokenInfo = {};
                        $ionicLoading.hide();
                        $scope.InitTab();
                    })

                    $ionicLoading.hide();

                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })
            }


            $scope.UserUpdate = {
                Password: "",
                CPassword: "",
                Id: "",
            }

            $scope.changePassword = function () {

                var tokenInfo = AuthenticationService.getTokenInfo();
                $scope.UserUpdate.Id = tokenInfo.UserId;

                if ($scope.UserUpdate.Password == "") {
                    ionicToast.show('Enter Password', 'bottom', false, 2500);
                } else if ($scope.UserUpdate.CPassword == "") {
                    ionicToast.show('Confirm Password', 'bottom', false, 2500);
                } else if ($scope.UserUpdate.Password != $scope.UserUpdate.CPassword) {
                    ionicToast.show('Password Mismatch', 'bottom', false, 2500);
                    $scope.UserUpdate = {
                        Password: "",
                        CPassword: ""
                    }
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    LoginService.ChangePassword($scope.UserUpdate).then(function (response) {
                        if (response.data) {
                            ionicToast.show('Successfully Changed Password', 'bottom', false, 2500);
                            $scope.UserUpdate = {
                                Password: "",
                                CPassword: ""
                            }
                        }
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                        $ionicLoading.hide();
                    });
                }
            };

            $scope.goItemAdd = function () {
                $state.go('addItem', {
                    ItemId: 0
                });
            }

            $scope.goOfferAdd = function (id) {
                $state.go('addOffer', {
                    OfferId: 0
                });
            }

            $scope.goSales = function (id) {
                $state.go('mySales', {
                    StatusId: 0
                });
            }


        }]);
