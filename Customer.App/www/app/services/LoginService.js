angular.module("eahara")
    .service('LoginService', ['$q', '$window', "$http", "app.config",
function ($q, $window, $http, config) {

            this.login = function (data) {
                return $http.post(config.basePath + "Login", data);
            }

            this.logOut = function (data) {
                return $http.post(config.basePath + "LogOut", data);
            };

            this.ChangePassword = function (data) {
                return $http.post(config.basePath + "ChangePassword", data);
            };

            this.sendDeviceId = function (data) {
                return $http.post(config.basePath + "sendDeviceId", data);
            };

            this.GenerateOTP = function (id) {
                return $http.get(config.basePath + "GenarateOtp/" + id);
            };

            this.GenerateOTPTrouble = function (id) {
                return $http.get(config.basePath + "GenerateOTPTrouble/" + id);
            };

            this.ResetPasswordEmail = function (data) {
                return $http.post(config.basePath + "ResetPasswordEmail", data);
            };

            this.ValidateOTP = function (data) {
                return $http.post(config.basePath + "OtpVerification", data);
            };


            this.User = {};
            this.setUserName = function (data) {
                //$window.sessionStorage["UserName"] = data;
                $window.sessionStorage.setItem("UserName", data);
                this.User.UserName = data;
            }

            this.clearUserName = function () {

                //$window.sessionStorage["UserName"] = undefined;
                $window.sessionStorage.removeItem("UserName");
                this.User = {};
            }

            this.getUserName = function () {

                if ($window.sessionStorage["UserName"] != undefined) {
                    this.User.UserName = $window.sessionStorage["UserName"];
                } else {
                    this.User = {};
                }
                return this.User;

            }
}
]);
