angular.module("eahara")
    .controller("DashboardController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', "$cordovaGeolocation",
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, $cordovaGeolocation) {

            $scope.Init = function () {
                $scope.LocInfo = AuthenticationService.getLocInfo();


                $scope.Categories = [];
                MainService.ItemCategoryInDropdown().then(function (response) {
                    if (response) {
                        $scope.Categories = response.data;
                    }
                }, function () {})

                $scope.ShopsCategories = [];
                MainService.ShopCategoryInDropdown().then(function (response) {
                    if (response) {
                        $scope.ShopsCategories = response.data;
                    }
                }, function () {})

                $scope.basePath = config.basePath;
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                if ($scope.LocInfo != null) {



                    $scope.Offers = [];
                    MainService.GetOffersInHome($scope.LocInfo.LocationId).then(function (res) {
                        $scope.Offers = res.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });

                    $scope.Filter = {
                        Preference: false,
                        Preference2: false,
                        Keyword: "",
                        Pagenation: 0,
                        ShopsCategories: [],
                        ItemCategories: [],
                        LocationId: $scope.LocInfo.LocationId,
                    }

                    $scope.Shops = [];
                    MainService.ShopsInHome($scope.Filter).then(function (response) {
                        if (response) {
                            $scope.Shops = response.data;
                        }
                        $ionicLoading.hide();
                    }, function () {
                        $ionicLoading.hide();
                    })

                }

                $scope.FilterView = false;


                $scope.now = new Date();
                $scope.Time = $scope.now.getHours();
                $scope.Minutes = $scope.now.getMinutes();
                $scope.CurrentTime = $scope.Time + "." + $scope.Minutes;
                $scope.CurrentTime = parseFloat($scope.CurrentTime);

                $scope.NearShops = [];
                $scope.CurrentAdd = "";
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };

                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var loc = {};
                        loc.lng = position.coords.longitude;
                        loc.lat = position.coords.latitude;


                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'latLng': loc
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    $scope.CurrentAdd = results[1].formatted_address;
                                }
                            }
                        });

                        MainService.NearShopsInHome(loc).then(function (response) {
                            if (response) {
                                $scope.NearShops = response.data;
                            }
                            $ionicLoading.hide();
                        }, function (err) {
                            $ionicLoading.hide();
                        })

                    }, function (err) {
                        console.log("err");
                    });


            }
            $scope.Init();


            $scope.ShowFilter = function () {
                $scope.FilterView = !$scope.FilterView;
            }

            $scope.LoadMore = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.Filter.Pagenation = $scope.Filter.Pagenation + 20;
                MainService.ShopsInHome($scope.Filter).then(function (response) {
                    if (response) {
                        if (response.data.length <= 0) {
                            ionicToast.show('No More Data Found !', 'bottom', false, 1500);
                        } else {
                            angular.forEach(response.data, function (e) {
                                $scope.Shops.push(e);
                            });
                        }
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                })
            }

            $scope.ApplyFilter = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.ShopsInHome($scope.Filter).then(function (response) {
                    if (response) {
                        $scope.Filter.Keyword = "";
                        $scope.Shops = response.data;
                        $scope.FilterView = false;
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                })

            }

            $scope.ApplyFilter2 = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Filter.ShopsCategories = [];
                angular.forEach($scope.ShopsCategories, function (e) {
                    if (e.IsChecked) {
                        $scope.Filter.ShopsCategories.push(e.Id)
                    }
                });

                MainService.ShopsInHome($scope.Filter).then(function (response) {
                    if (response) {
                        $scope.Filter.Keyword = "";
                        $scope.Shops = response.data;
                        $scope.FilterView = false;
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                })

            }

            $scope.ApplyFilter3 = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Filter.ItemCategories = [];
                angular.forEach($scope.Categories, function (e) {
                    if (e.IsChecked) {
                        $scope.Filter.ItemCategories.push(e.Id)
                    }
                });

                MainService.ShopsInHome($scope.Filter).then(function (response) {
                    if (response) {
                        $scope.Filter.Keyword = "";
                        $scope.Shops = response.data;
                        $scope.FilterView = false;
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                })

            }

            $scope.GoOfferItems = function (id) {
                $state.go('offerItems', {
                    OfferId: id
                });
            }

        }]);
