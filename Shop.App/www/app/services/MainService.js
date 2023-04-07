angular.module("eahara")
    .service('MainService', ['$http', '$q', "app.config",
         function ($http, $q, config) {

            this.DashBoardCounts = function (id) {
                return $http.get(config.basePath + "DashBoardCounts/" + id);
            };

            this.ItemCategoryInDropdown = function () {
                return $http.get(config.basePath + "ItemCategoryInDropdown");
            };

            this.GetShopOffers = function (id) {
                return $http.get(config.basePath + "GetShopOffers/" + id);
            };

            this.GetShopItemsByShopId = function (id) {
                return $http.get(config.basePath + "GetShopItemsByShopId/" + id);
            };

            this.makeItemInactive = function (id) {
                return $http.get(config.basePath + "makeItemInactive/" + id);
            };

            this.RemoveItemoffer = function (id) {
                return $http.get(config.basePath + "RemoveItemoffer/" + id);
            };

            this.ItemsById = function (id) {
                return $http.get(config.basePath + "ItemsById/" + id);
            };

            this.DeleteItem = function (id) {
                return $http.get(config.basePath + "DeleteItem/" + id);
            };

            this.AddItems = function (data) {
                return $http.post(config.basePath + "AddItems", data);
            };

            this.AddOffers = function (data) {
                return $http.post(config.basePath + "AddOffers", data);
            };

            this.AddShops = function (data) {
                return $http.post(config.basePath + "AddShops", data);
            };

            this.UpdateBookingStatus = function (data) {
                return $http.post(config.basePath + "UpdateBookingStatus", data);
            };

            this.BookingReportsShop = function (data) {
                return $http.post(config.basePath + "BookingReportsShop", data);
            };

            this.GetShopOffers = function (id) {
                return $http.get(config.basePath + "GetShopOffers/" + id);
            };

            this.DeleteOffers = function (id) {
                return $http.get(config.basePath + "DeleteOffers/" + id);
            };

            this.ShopsById = function (id) {
                return $http.get(config.basePath + "ShopsById/" + id);
            };

            this.GetOfferyId = function (id) {
                return $http.get(config.basePath + "GetOfferyId/" + id);
            };

            this.getNotiCaount = function (id) {
                return $http.get(config.basePath + "getNotiCaount/" + id);
            };

            this.resetUserNotifications = function (id) {
                return $http.get(config.basePath + "resetUserNotifications/" + id);
            };

            this.GetUserNotifications = function (id) {
                return $http.get(config.basePath + "GetUserNotifications/" + id);
            };

            this.StatusInDropdown = function () {
                return $http.get(config.basePath + "StatusInDropdown");
            };

            this.GetShopSalesById = function (id, sid) {
                return $http.get(config.basePath + "GetShopSalesById/" + id + "/" + sid);
            };

         }]);
