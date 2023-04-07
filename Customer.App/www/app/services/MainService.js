angular.module("eahara")
    .service('MainService', ['$http', '$q', "app.config",
         function ($http, $q, config) {

            this.GetOffersInHome = function (id) {
                return $http.get(config.basePath + "GetOffersInHome/" + id);
            };

            this.ShopCategoryInDropdown = function () {
                return $http.get(config.basePath + "ShopCategoryInDropdown");
            };

            this.ShopCategoryInDropdown = function () {
                return $http.get(config.basePath + "ShopCategoryInDropdown");
            };

            this.ItemCategoryInDropdown = function () {
                return $http.get(config.basePath + "ItemCategoryInDropdown");
            };

            this.GetOffers = function (id) {
                return $http.get(config.basePath + "GetOffers/" + id);
            };

            this.LocationInDropdown = function () {
                return $http.get(config.basePath + "LocationInDropdown");
            };

            this.MMethodInDropdown = function () {
                return $http.get(config.basePath + "MMethodInDropdown");
            };

            this.ShopsInHome = function (data) {
                return $http.post(config.basePath + "ShopsWithFilter", data);
            };

            this.AddBooking = function (data) {
                return $http.post(config.basePath + "AddBooking", data);
            };

            this.AddDevice = function (data) {
                return $http.post(config.basePath + "AddDevice", data);
            };

            this.AddReview = function (data) {
                return $http.post(config.basePath + "AddReview", data);
            };

            this.ShopDetailById = function (id) {
                return $http.get(config.basePath + "ShopDetailById/" + id);
            };

            this.DeviceByIdUID = function (id) {
                return $http.get(config.basePath + "DeviceByIdUID/" + id);
            };

            this.ItemDetailById = function (id) {
                return $http.get(config.basePath + "ItemDetailById/" + id);
            };

            this.ItemsByCatId = function (id, locId) {
                return $http.get(config.basePath + "ItemsByCatId/" + id + "/" + locId);
            };

            this.getShopItemCats = function (id) {
                return $http.get(config.basePath + "getShopItemCats/" + id);
            };

            this.ShopsByKeyword = function (id, locid) {
                return $http.get(config.basePath + "ShopsByKeyword/" + id + "/" + locid);
            };

            this.LocationInDropdown = function () {
                return $http.get(config.basePath + "LocationInDropdown");
            };

            this.checkLocationActive = function (id) {
                return $http.get(config.basePath + "checkLocationActive/" + id);
            };

            this.ItemsByKeyword = function (id, locid) {
                return $http.get(config.basePath + "ItemsByKeyword/" + id + "/" + locid);
            };

            this.getShopReviews = function (id) {
                return $http.get(config.basePath + "getShopReviews/" + id);
            };

            this.GetShopItemsHavingOffer = function (id) {
                return $http.get(config.basePath + "GetShopItemsHavingOffer/" + id);
            };

            this.GetShopCatItems = function (id, catid) {
                return $http.get(config.basePath + "GetShopCatItems/" + id + "/" + catid);
            };

            this.GetCompanyProfile = function () {
                return $http.get(config.basePath + "GetCompanyProfile");
            };

            this.AddEnquiry = function (data) {
                return $http.post(config.basePath + "AddEnquiry", data);
            };

            this.ItemsByOfferId = function (id) {
                return $http.get(config.basePath + "ItemsByOfferId/" + id);
            };


            ///// register ///////

            this.RegisterCustomer = function (data) {
                return $http.post(config.basePath + "RegisterCustomer", data);
            };
            this.SendRegisterOtp = function (id) {
                return $http.get(config.basePath + "SendRegisterOtp/" + id);
            };

            this.SendTroubleOtp = function (id) {
                return $http.get(config.basePath + "SendTroubleOtp/" + id);
            };

            this.CustomerById = function (id) {
                return $http.get(config.basePath + "CustomerById/" + id);
            };

            this.MyOrdersInApp = function (id) {
                return $http.get(config.basePath + "MyOrdersInApp/" + id);
            };

            this.ResetTroublePswd = function (data) {
                return $http.post(config.basePath + "ResetTroublePswd", data);
            };

            this.CheckPromoOffersByCusId = function (id, cusid) {
                return $http.get(config.basePath + "CheckPromoOffersByCusId/" + id + "/" + cusid);
            };

            this.NearShopsInHome = function (data) {
                return $http.post(config.basePath + "NearShopsInHome", data);
            };

            this.NearShopsInHome2 = function (data) {
                return $http.post(config.basePath + "NearShopsInHome2", data);
            };

            this.CancelBooking = function (id) {
                return $http.post(config.basePath + "CancelBooking", id);
            };

            this.AddressbyCusId = function (id) {
                return $http.get(config.basePath + "AddressbyCusId/" + id);
            };

            this.GetShopItemsByShopId = function (id) {
                return $http.get(config.basePath + "GetShopItemsByShopId/" + id);
            };

            this.getShopItemsForFirstLoad = function (id) {
                return $http.get(config.basePath + "getShopItemsForFirstLoad/" + id);
            };

            this.getNotiCaount = function (id) {
                return $http.get(config.basePath + "getNotiCaount/" + id);
            };

            this.GetUserNotifications = function (id) {
                return $http.get(config.basePath + "GetUserNotifications/" + id);
            };

            this.resetUserNotifications = function (id) {
                return $http.get(config.basePath + "resetUserNotifications/" + id);
            };

            this.GetItemInCart = function (id) {
                return $http.get(config.basePath + "GetItemInCart/" + id);
            };

            this.GetShopInCart = function (id) {
                return $http.get(config.basePath + "GetShopInCart/" + id);
            };

            this.TrackOrder = function (num) {
                return $http.get(config.basePath + "TrackOrder/" + num);
            };

            this.updateCustomer = function (data) {
                return $http.post(config.basePath + "updateCustomer", data);
            };

            this.AddAddress = function (data) {
                return $http.post(config.basePath + "AddAddress", data);
            };


         }]);
