angular.module("eahara")
    .service('MainService', ['$http', '$q', "app.config",
         function ($http, $q, config) {

            this.DriverDashBoardCounts = function (id) {
                return $http.get(config.basePath + "DriverDashBoardCounts/" + id);
            };

            this.MEDDriverDashBoardCounts = function (id) {
                return $http.get(config.basePath + "MEDDriverDashBoardCounts/" + id);
            };

            this.GetUserNotifications = function (id) {
                return $http.get(config.basePath + "GetUserNotifications/" + id);
            };

            this.getNotiCaount = function (id) {
                return $http.get(config.basePath + "getNotiCaount/" + id);
            };

            this.BookingDetailsById = function (id) {
                return $http.get(config.basePath + "BookingDetailsById/" + id);
            };

            this.MEDBookingDetailsById = function (id) {
                return $http.get(config.basePath + "MEDBookingDetailsById/" + id);
            };

            this.SaveDelivredFromDriver = function (id) {
                return $http.get(config.basePath + "SaveDelivredFromDriver/" + id);
            };

            this.MEDSaveDelivredFromDriver = function (id) {
                return $http.get(config.basePath + "MEDSaveDelivredFromDriver/" + id);
            };

            this.SavePickedFromDriver = function (id) {
                return $http.get(config.basePath + "SavePickedFromDriver/" + id);
            };

            this.MEDSavePickedFromDriver = function (id) {
                return $http.get(config.basePath + "MEDSavePickedFromDriver/" + id);
            };

            this.resetUserNotifications = function (id) {
                return $http.get(config.basePath + "resetUserNotifications/" + id);
            };

            this.getDriverOrdersUnDelivrerd = function (id) {
                return $http.get(config.basePath + "getDriverOrdersUnDelivrerd/" + id);
            };

            this.MEDgetDriverOrdersUnDelivrerd = function (id) {
                return $http.get(config.basePath + "MEDgetDriverOrdersUnDelivrerd/" + id);
            };

            this.getDriverOrdersUnDelivrerdByDay = function (data) {
                return $http.post(config.basePath + "getDriverOrdersUnDelivrerdByDay", data);
            };

            this.MEDgetDriverOrdersUnDelivrerdByDay = function (data) {
                return $http.post(config.basePath + "MEDgetDriverOrdersUnDelivrerdByDay", data);
            };




         }]);
