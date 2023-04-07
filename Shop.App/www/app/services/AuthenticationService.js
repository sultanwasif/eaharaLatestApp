angular.module("eahara")
    .service('AuthenticationService', ["app.config", "LocalStorageFactory",
        function (config, LocalStorageFactory) {

            var tokenInfo;

            this.init = function () {
                tokenInfo = this.getTokenInfo();
            };
            this.setTokenInfo = function (data) {
                tokenInfo = data;
                LocalStorageFactory.set("TokenInfo", JSON.stringify(tokenInfo));
            };

            this.getTokenInfo = function () {
                tokenInfo = JSON.parse(LocalStorageFactory.get("TokenInfo"));
                return tokenInfo;
            };

            this.removeTokenInfo = function () {
                var tokenInfo = null;
                LocalStorageFactory.set("TokenInfo", JSON.stringify(tokenInfo));
            };

            this.setLanInfo = function (data) {
                lanInfo = data;
                LocalStorageFactory.set("Language", JSON.stringify(lanInfo));
            };

            this.getLanInfo = function () {
                lanInfo = JSON.parse(LocalStorageFactory.get("Language"));
                return lanInfo;
            };

            this.setHeader = function (config) {
                var token = tokenInfo ? tokenInfo.Token : null;
                if (token) {
                    config.headers['Authorization'] = 'Basic ' + token;
                }
            };

            this.init();
        }
])