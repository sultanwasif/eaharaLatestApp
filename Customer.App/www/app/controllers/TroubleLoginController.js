angular.module("eahara")
    .controller("TroubleLoginController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicSlideBoxDelegate', '$interval', 'MainService', '$stateParams',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicSlideBoxDelegate, $interval, MainService, $stateParams) {


            $scope.Init = function () {

                $scope.Register = {
                    MobileNo: "",
                    OTP: 0,
                }

                $scope.User = {
                    Id: "",
                    Password: "",
                    CPassword: ""
                }

                $scope.View = 0;
                $scope.Otp = 0;
                $ionicLoading.hide();
            }
            $scope.Init();

            $scope.ResetTroublePswd = function () {

                if ($scope.User.Password == "") {

                    ionicToast.show("Enter Password", 'bottom', false, 1500);

                } else if ($scope.User.CPassword == "") {

                    ionicToast.show("Confirm Password", 'bottom', false, 1500);

                } else if ($scope.User.Password != $scope.User.CPassword) {

                    ionicToast.show("Password Mismatch", 'bottom', false, 1500);

                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    MainService.ResetTroublePswd($scope.User).then(function (response) {
                        if (response.data) {
                            ionicToast.show('Successfully Resetted', 'bottom', false, 1500);
                            $state.go("login");
                        } else {
                            ionicToast.show('Network Error', 'bottom', false, 1500);
                        }
                        $ionicLoading.hide();
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    });
                }
            };

            $scope.SendOtp = function () {

                if ($scope.Register.MobileNo == "") {

                    ionicToast.show('Enter Mobile No', 'bottom', false, 1500);

                } else {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    MainService.SendTroubleOtp($scope.Register.MobileNo).then(function (response) {
                        if (response.data.Message == "NotRegistered") {

                            ionicToast.show('Mobile  Not Registered', 'bottom', false, 1500);


                        } else if (response.data.Message == "Done") {

                            ionicToast.show('OTP Send');

                            $scope.Otp = response.data.OTP;
                            $scope.User.Id = response.data.UserId;
                            $scope.View = 1;

                        } else if (response.data.Message == "NoUser") {

                            ionicToast.show('Operation Cannot Proceed Please Contact Us', 'bottom', false, 1500);


                        } else {
                            ionicToast.show('Some Error Occurred! Please Try Again Later', 'bottom', false, 1500);
                        }
                        $ionicLoading.hide();
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 1500, 'bottom', false, 1500);
                    });
                }
            };

            $scope.CheckOtp = function () {
                if ($scope.Register.OTP == 0) {

                    ionicToast.show('Enter OTP No', 'bottom', false, 1500);

                } else if ($scope.Register.OTP != $scope.Otp) {

                    ionicToast.show('OTP No Not Matching', 'bottom', false, 1500);

                } else {
                    $scope.View = 2;
                }
            }



        }]);