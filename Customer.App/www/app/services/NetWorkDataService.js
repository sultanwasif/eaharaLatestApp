angular.module("eahara")
    .service("NetWorkDataService", ["app.config", function (config) {

        this.isOnline = false;
        this.getNetworkStatus = function () { // return network status
            return this.isOnline;
        };
        this.setNetworkStatus = function (value) { // getting network status from app.js
            this.isOnline = value;
        };

}])
