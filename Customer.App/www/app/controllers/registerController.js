angular.module("eahara")
    .controller("registerController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicSlideBoxDelegate', '$interval', 'MainService', '$stateParams',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicSlideBoxDelegate, $interval, MainService, $stateParams) {
            $scope.init = function () {

                $scope.View = 0;

                $scope.Register = {
                    Name: "",
                    Email: "",
                    MobileNo: "",
                    TelephoneNo: "",
                    Address: "",
                    Location: "",
                    IsCheckedTerms: false,
                }

                $scope.User = {
                    UserName: "",
                    Password: "",
                    CPassword: ""
                }

                $ionicLoading.hide();
                $scope.Otp2 = "";
                $scope.Otp = "";
            }
            $scope.init();

            $scope.Methods = [];
            MainService.MMethodInDropdown().then(function (res) {
                $scope.Methods = res.data;
            })


            $scope.SendOtp = function () {
                if ($scope.Register.MobileNo == "") {
                    ionicToast.show("Enter Mobile No", 'bottom', false, 1500);
                } else if ($scope.Register.MobileNo.length != 10) {
                    ionicToast.show("Enter Valid Mobile No", 'bottom', false, 1500);
                } else {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    MainService.SendRegisterOtp($scope.Register.MobileNo).then(function (response) {
                        if (response.data == 2) {
                            ionicToast.show("Mobile No Already Registered !", 'bottom', false, 1500);
                        } else if (response.data == 0) {
                            ionicToast.show("Network Error", 'bottom', false, 1500);
                        } else {
                            ionicToast.show("OTP Send", 'bottom', false, 1500);
                            $scope.View = 1;
                            $scope.Otp = response.data;
                        }
                        $ionicLoading.hide();
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show("Network Error", 'bottom', false, 1500);
                    });
                }
            }

            $scope.CheckOtp = function () {

                if ($scope.Register.Otp != $scope.Otp) {
                    ionicToast.show("OTP Not Matching", 'bottom', false, 1500);
                } else {
                    $scope.View = 2;
                }
            };


            $scope.RegisterNow = function () {
                if ($scope.User.Password == "") {
                    ionicToast.show("Enter Password", 'bottom', false, 1500);
                } else if ($scope.User.CPassword == "") {
                    ionicToast.show("Confirm Password", 'bottom', false, 1500);
                } else if ($scope.User.Password != $scope.User.CPassword) {
                    ionicToast.show("Password Missmatch", 'bottom', false, 1500);
                } else if ($scope.Register.IsCheckedTerms != true) {
                    ionicToast.show("You must agree to the terms and conditions before register", 'bottom', false, 1500);
                } else {

                    $scope.Register.UserName = $scope.Register.MobileNo;
                    $scope.Register.Password = $scope.User.Password;
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    $scope.Register.CustomerMMethods = [];
                    angular.forEach($scope.Methods, function (e) {
                        if (e.IsChecked == true) {
                            var temp = {
                                MMethodId: e.Id,
                            }
                            $scope.Register.CustomerMMethods.push(temp);
                        }
                    });


                    MainService.RegisterCustomer($scope.Register).then(function (response) {
                        if (response.data == 1) {
                            ionicToast.show("Successfully Registered", 'bottom', false, 1500);
                            $state.go("login");
                        } else if (response.data == 2) {
                            ionicToast.show("Username Already Registered", 'bottom', false, 1500);
                            $scope.View = 0;
                        } else {
                            ionicToast.show("Network Error", 'bottom', false, 1500);
                        }
                        $ionicLoading.hide();
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show("Network Error", 'bottom', false, 1500);
                    });
                }
            }


        }]);
