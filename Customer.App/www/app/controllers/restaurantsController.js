angular.module("eahara")
    .controller("restaurantsController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', 'MainService',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, MainService) {


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

                if ($scope.LocInfo != null) {


                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
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



        }]);
