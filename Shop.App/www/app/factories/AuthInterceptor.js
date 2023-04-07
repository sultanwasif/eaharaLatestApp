angular.module("eahara")
    .factory("AuthInterceptor", ["$q", "$rootScope", "$window", "$injector",
       function ($q, $rootScope, $window, $injector) {
            return {
                request: function (config) {
                    var AuthenticationService = $injector.get("AuthenticationService");
                    AuthenticationService.init();
                    AuthenticationService.setHeader(config);
                    return config;
                },
                requestError: function (rejection) {
                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (response.status == "401") {
                        var state = $injector.get("$state");
                        var LoginService = $injector.get("LoginService");
                        var AuthenticationService = $injector.get("AuthenticationService");
                        LoginService.logOut().then(function () {
                            AuthenticationService.removeTokenInfo();
                            state.go('login');
                        }, function () {
                            state.go('login');
                        })
                    }
                    //the same response/modified/or a new one need to be returned.
                    return response;
                },
                responseError: function (rejection) {
                    var state = $injector.get("$state");
                    if (rejection.status == "401") {
                        var LoginService = $injector.get("LoginService");
                        var AuthenticationService = $injector.get("AuthenticationService");
                        LoginService.logOut().then(function () {
                            AuthenticationService.removeTokenInfo();
                            state.go('login');
                        }, function () {
                            state.go('login');
                        })
                    } else if (rejection.status == "403") {
                        state.go('Forbidden');
                    }
                    return $q.reject(rejection);
                }
            };
       }]);