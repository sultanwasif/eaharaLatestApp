angular.module("eahara")
    .service('AuthenticationService', ["app.config", "LocalStorageFactory",
        function (config, LocalStorageFactory) {

            var tokenInfo;

            this.init = function () {
                tokenInfo = this.getTokenInfo();
            };
            this.setTokenInfo = function (data) {
                tokenInfo = data;
                LocalStorageFactory.set("EaharaTokenInfo", JSON.stringify(tokenInfo));
            };

            this.getTokenInfo = function () {
                //console.log(LocalStorageFactory.get("TokenInfo"));
                tokenInfo = JSON.parse(LocalStorageFactory.get("EaharaTokenInfo"));
                return tokenInfo;
            };

            this.removeTokenInfo = function () {
                var tokenInfo = null;
                LocalStorageFactory.set("EaharaTokenInfo", JSON.stringify(tokenInfo));
                //LocalStorageFactory.clearAll();
            };

            this.setLangInfo = function (data) {
                LangInfo = data;
                LocalStorageFactory.set("LangInfo", JSON.stringify(LangInfo));
            };

            this.getLangInfo = function () {
                //console.log(LocalStorageFactory.get("TokenInfo"));
                LangInfo = JSON.parse(LocalStorageFactory.get("LangInfo"));
                return LangInfo;
            };

            this.setCart = function (data) {
                cart = data;
                LocalStorageFactory.set("eaharaCart", JSON.stringify(cart));
            };

            this.getCart = function () {
                cart = JSON.parse(LocalStorageFactory.get("eaharaCart"));
                return cart;
            };

            this.removeCart = function () {
                var cart = [];
                LocalStorageFactory.set("eaharaCart", JSON.stringify(cart));
            };

            this.setHeader = function (config) {
                var token = tokenInfo ? tokenInfo.Token : null;
                if (token) {
                    config.headers['Authorization'] = 'Basic ' + token;
                }
            };

            this.setDeviceInfo = function (data) {
                LocalStorageFactory.set("EaharaDeviceInfo", JSON.stringify(data));
            };

            this.getDeviceInfo = function () {
                deviceInfo = JSON.parse(LocalStorageFactory.get("EaharaDeviceInfo"));
                return deviceInfo;
            };


            this.setLocInfo = function (data) {
                tokenInfo = data;
                LocalStorageFactory.set("EaharaLocInfo", JSON.stringify(tokenInfo));
            };

            this.getLocInfo = function () {
                //console.log(LocalStorageFactory.get("TokenInfo"));
                tokenInfo = JSON.parse(LocalStorageFactory.get("EaharaLocInfo"));
                return tokenInfo;
            };

            this.removeLocInfo = function () {
                var tokenInfo = null;
                LocalStorageFactory.set("EaharaLocInfo", JSON.stringify(tokenInfo));
                //LocalStorageFactory.clearAll();
            };


            this.init();
        }
])
