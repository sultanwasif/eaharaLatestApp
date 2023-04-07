angular.module("eahara")
    .controller("TabController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaSocialSharing) {

            $scope.InitTab = function () {
                $scope.TokenInfo = AuthenticationService.getTokenInfo();
                $scope.IsLoggedIn = false;
                if ($scope.TokenInfo != null) {
                    $scope.IsLoggedIn = true;
                }
                $scope.CompanyProfile = {};
                MainService.GetCompanyProfile().then(function (res) {
                    $scope.CompanyProfile = res.data;
                    $ionicLoading.hide();
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });

                $scope.LocInfo = AuthenticationService.getLocInfo();
                $scope.LocationSelected = false;
                if ($scope.LocInfo != null) {
                    MainService.checkLocationActive($scope.LocInfo.LocationId).then(function (response) {
                        if (response.data != null) {
                            $scope.LocInfo = response.data;
                            $scope.LocInfo.LocationId = response.data.Id;
                            $scope.LocationSelected = true;
                        } else {
                            $state.go("locations");
                            ionicToast.show('Select Location Point!', 'bottom', false, 1500);
                        }
                    }, function () {
                        $ionicLoading.hide();
                        $state.go("locations");
                        ionicToast.show('Select Location Point!', 'bottom', false, 1500);
                    })
                } else {
                    $state.go("locations");
                    ionicToast.show('Select Location Point!', 'bottom', false, 1500);
                }


            }
            $scope.InitTab();

            $scope.InitCart = function () {
                $scope.CartLength = 0;
                $scope.MyCart = AuthenticationService.getCart();
                if ($scope.MyCart != null && $scope.MyCart.length > 0) {
                    $scope.CartLength = $scope.MyCart.length;
                } else {
                    $scope.CartLength = 0;
                }
            }
            $scope.InitCart();

            $scope.NotifiCount = 0;
            setInterval(function () {
                $scope.TokenInfo = AuthenticationService.getTokenInfo();
                if ($scope.TokenInfo != null) {
                    MainService.getNotiCaount($scope.TokenInfo.UserId).then(function (res) {
                        $scope.NotifiCount = res.data;
                    })
                }
            }, 10000);



            $scope.goToShopDetails = function (Id) {
                $state.go('restaurantDetail', {
                    RestaurantId: Id
                });
            }

            $scope.ChangeLocation = function (data) {
                data.LocationId = data.Id;
                AuthenticationService.setLocInfo(data);
                $scope.LocInfo = AuthenticationService.getLocInfo();
                $scope.LocationSelected = true;
                $state.go("home");

                $scope.MyCart = AuthenticationService.getCart();
                if ($scope.MyCart != null && $scope.MyCart.length > 0) {
                    ionicToast.show('Location Changed Resetting Cart !!!', 'bottom', false, 2500);
                    var ordersToCheckout = [];
                    AuthenticationService.setCart(ordersToCheckout);
                    $scope.InitCart();

                }

            }


            /////////////////////////////////

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
                    $state.go("home").then(function (response) {
                        $ionicHistory.clearHistory();
                        $ionicHistory.clearCache();
                        tokenInfo = {};
                        $ionicLoading.hide();
                        $scope.InitTab();
                    })

                    $ionicLoading.hide();

                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                })
            }

            $scope.Filter = {
                OrderNo: "",
            }


            $scope.Results = null;
            $scope.TrackLoad = false;
            $scope.TrackNow = function () {
                if ($scope.Filter.OrderNo == "") {
                    ionicToast.show('Invalid Data Given!', 'bottom', false, 1500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    $scope.TrackLoad = true;
                    MainService.TrackOrder($scope.Filter.OrderNo).then(function (response) {
                        if (response.data != null) {
                            $scope.Results = response.data;
                        } else {
                            ionicToast.show('Invalid Data Given!', 'bottom', false, 1500);
                        }
                        $ionicLoading.hide();
                    }, function () {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    })
                }
            }


            $scope.UserUpdate = {
                Password: "",
                CPassword: "",
                Id: "",
            }

            $scope.changePassword = function () {

                $scope.UserUpdate.Id = $scope.TokenInfo.UserId;

                if ($scope.UserUpdate.Password == "") {
                    ionicToast.show('Enter Password', 'bottom', false, 1500);
                } else if ($scope.UserUpdate.CPassword == "") {
                    ionicToast.show('Confirm Password', 'bottom', false, 1500);
                } else if ($scope.UserUpdate.Password != $scope.UserUpdate.CPassword) {
                    ionicToast.show('Password Mismatch', 'bottom', false, 1500);
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
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });
                }
            };


            $scope.InitEnq = function () {
                $scope.Enquiry = {
                    Name: "",
                    MobileNo: "",
                    Remarks: "",
                    Email: "",
                }
            }
            $scope.InitEnq();

            $scope.EnquireNow = function () {

                if ($scope.Enquiry.Name == "") {
                    ionicToast.show('Name Required', 'bottom', false, 2500);
                } else if ($scope.Enquiry.MobileNo == "") {
                    ionicToast.show('Phone Number Required', 'bottom', false, 2500);
                } else if ($scope.Enquiry.Remarks == "") {
                    ionicToast.show('Message Required', 'bottom', false, 2500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    MainService.AddEnquiry($scope.Enquiry).then(function (response) {
                        if (response.data) {
                            ionicToast.show('Successfully Posted Enquiry', 'bottom', false, 2500);
                            $scope.InitEnq();
                        }
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });
                }
            };

            $scope.logErr = function () {
                ionicToast.show('Login To Participate', 'bottom', false, 2500);
            }

        }]);
